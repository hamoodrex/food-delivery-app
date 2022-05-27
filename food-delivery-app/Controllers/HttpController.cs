using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using food_delivery_app.Controllers.data;
using food_delivery_app.Controllers.data.structures;
using Newtonsoft.Json;
using Npgsql;
using Microsoft.AspNetCore.Cors;

namespace food_delivery_app.Controllers
{
    [EnableCors("Policy")]
    [ApiController]
    [Route("")]
    public class HttpController : ControllerBase
    {

        private readonly ILogger<HttpController> _logger;
        public static CustomEnvironment env = new CustomEnvironment();

        public HttpController(ILogger<HttpController> logger)
        {
            _logger = logger;
        }

        [HttpGet("/restaurant")]
        public string GetRestaurant(int id){
            lock (Database.connection){
                using var cmd = new NpgsqlCommand("select restaurants.name from restaurants where id = ($1)", Database.connection){
                    Parameters = {
                        new() { Value = id}
                    }
                };
                return Convert.ToString(cmd.ExecuteScalar());
            }
                
        }

        [HttpPost("/restaurants")]
        public string GetRestaurants([FromBody]object json) {
            lock(Database.connection){
                Address address = JsonConvert.DeserializeObject<Address>(json.ToString());
                if (address == null){
                    return "[]";
                }
                List<Restaurant> list = new();
                // Get from DB restaurants
                using var cmd = new NpgsqlCommand("select id,name,description,rating from restaurants where country = ($1) and district = ($2)", Database.connection){
                    Parameters = {
                        new() { Value = address.country},
                        new() { Value = address.district}
                    }
                };
                cmd.Prepare();
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Restaurant restaurant = new()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1),
                        description = reader.GetString(2),
                        rating = reader.GetDouble(3),

                    };
                    list.Add(restaurant);
                }

                return JsonConvert.SerializeObject(list);
            }
        }

        [HttpGet("/menu")]
        public string GetMenu(int restaurant_id)
        {
            lock(Database.connection){
                Restaurant restaurant = new();
                restaurant.QueryRestaurant(restaurant_id);
                restaurant.menu.QuerySubMenus(restaurant_id);
                foreach (SubMenu sub_menu in restaurant.menu.sub_menus)
                {
                    sub_menu.QueryItems(sub_menu.id);
                }
                return JsonConvert.SerializeObject(restaurant);
            }
            
        }
        
        [HttpGet("/item")]
        public string GetItem(int item_id)
        {
            using var cmd = new NpgsqlCommand("select id,name,description,price from items where id = ($1)", Database.connection)
            {
                Parameters =
                {
                    new() { Value = item_id}
                }
            };
            Item item = new();
            cmd.Prepare();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                item = new()
                {
                    id = item_id,
                    name = reader.GetString(1),
                    description = reader.GetString(2),
                    price = reader.GetDouble(3)
                };
                
            }
            reader.Dispose();
            item.QuerySelections(item_id);
            return JsonConvert.SerializeObject(item);
        }

        [HttpGet("/order_status")]
        public string GetStatus(int order_id)
        {
            // Security vulnerabiltiy here <-- Should we care? It's just a status!

            string query = "select status.name from orders join status on orders.status = status.id where orders.id = ($1);";
            using var cmd = new NpgsqlCommand(query, Database.connection)
            {
                Parameters =
                {
                    new() { Value = order_id },
                }
            };
            string status = Convert.ToString(cmd.ExecuteScalar());
            return $"{{\"status\":\"{status}\"}}";
        }

        [HttpPost("/create_order")]
        public string CreateOrder([FromBody]object json){
            Order order = JsonConvert.DeserializeObject<Order>(json.ToString());
            string order_query = "insert into orders (restaurant_id,country,district,city,details,payment_method,long,lat,comments,price) values (($1),($2),($3),($4),($5),($6),($7),($8),($9),($10)) returning id;";
            using var cmd = new NpgsqlCommand(order_query, Database.connection)
            {
                Parameters =
                {
                    new() { Value = order.restaurant_id },
                    new() { Value = order.address.country },
                    new() { Value = order.address.district },
                    new() { Value = order.address.city },
                    new() { Value = order.address.details },
                    new() { Value = ((int)order.payment_method) },
                    new() { Value = order.address.longitude },
                    new() { Value = order.address.latitude },
                    new() { Value = order.comments },
                    new() { Value = order.price },
                }
            };
            cmd.Prepare();
            order.id = Convert.ToInt32(cmd.ExecuteScalar());
            string selections_query = "";
            
            List<string> item_values = new List<string>();
            foreach (Item item in order.cart){
                // No need to check for item's sql injection techniques.
                // We are just passing integers
                item_values.Add($"({order.id},{item.id},{item.quantity})");
            }
            string joined_str = String.Join(",",item_values.ToArray());
            string items_query = $"insert into order_items (order_id,item_id,quantity) values {joined_str} returning id;";
            using var cmd2 = new NpgsqlCommand(items_query, Database.connection);
            using var reader = cmd2.ExecuteReader();
            int[] order_item_ids = new int[order.cart.Count()];
            for (int i = 0; reader.Read(); i++){
                order_item_ids[i] = reader.GetInt32(0);
            }
            reader.Close();
            for (int i = 0; i < order.cart.Count(); i++){
                int order_item_id = order_item_ids[i];
                foreach (Selection selection in order.cart[i].selections)
                    selections_query += $"insert into order_item_selections (order_item_id,selection_id) values ({order_item_id},{selection.id});";
            }
            if (selections_query.Length != 0){
                using var cmd3 = new NpgsqlCommand(selections_query, Database.connection);
                cmd3.ExecuteNonQuery();
            }
            return JsonConvert.SerializeObject(order);
        }

        [HttpPost("/login")]
        public string Login([FromBody]object json){
            dynamic credentials = JsonConvert.DeserializeObject(json.ToString());
            // object contains credentials.email & credentials.password
            string email = credentials.email;
            string hashed_password = PasswordHasher.hash((string)credentials.password, env["salt"]);
            using var cmd = new NpgsqlCommand("select is_owner,restaurant_id from users where email = ($1) and password = ($2)", Database.connection){
                Parameters = {
                    new() {Value = email},
                    new() {Value = hashed_password}
                }
            };
            int count = 0;
            bool is_owner = false;
            int restaurant_id = -1;
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                if (reader.GetBoolean(0)) is_owner = true;
                restaurant_id = reader.GetInt32(1);
                count++;
            }
            reader.Close();
            if (count == 0) return "";
            var obj = new{
                restaurant_id,
                auth = CrypticAES.encrypt(JsonConvert.SerializeObject(credentials),env["aeskey"]),
                is_owner
            };
            return JsonConvert.SerializeObject(obj);
        }

        [HttpPost("/add_user")]
        public string AddUser([FromBody]object json){
            lock (Database.connection){
                dynamic user = JsonConvert.DeserializeObject(json.ToString());
                string query = "insert into users (restaurant_id,email,phone_number,is_owner,password,first_name,last_name) values (($1),($2),($3),($4),($5),($6),($7));";
                using var cmd = new NpgsqlCommand(query, Database.connection){
                    Parameters = {
                        new() {Value = (int)user.restaurant_id},
                        new() {Value = (string)user.email},
                        new() {Value = (string)user.phone_number},
                        new() {Value = (bool)user.is_owner},
                        new() {Value = PasswordHasher.hash((string)user.password, env["salt"])},
                        new() {Value = (string)user.first_name},
                        new() {Value = (string)user.last_name},
                    }
                };
                cmd.ExecuteNonQuery();
                return "{}";
            }
        }

        [HttpGet("/get_active_orders")]
        public string GetActiveOrders(int restaurant_id,[FromHeader]string authToken){
            dynamic credentials = JsonConvert.DeserializeObject(CrypticAES.decrypt(authToken,env["aeskey"]));
            bool is_owner = false;
            bool confirm = Auth.ConfirmRestaurantCredentials(credentials, restaurant_id, out is_owner);
            if (!confirm)
                return "[]";
            string query = "select * from orders where restaurant_id = ($1) and status < 4";
            using var cmd = new NpgsqlCommand(query, Database.connection){
                Parameters = {
                    new() {Value = restaurant_id}
                }
            };
            cmd.Prepare();
            using var reader = cmd.ExecuteReader();
            List<Order> orders = new();
            while (reader.Read()){
                Order order = new(){
                    id = reader.GetInt32(0),
                    restaurant_id = reader.GetInt32(1),
                    date = new DateTimeOffset(reader.GetDateTime(2)).ToUnixTimeMilliseconds(),
                    status = (OrderStatus)reader.GetInt32(3),
                    address = new Address(){
                        country = reader.GetString(4),
                        district = reader.GetString(5),
                        city = reader.GetString(6),
                        details = reader.GetString(7),
                        longitude = reader.GetDouble(9),
                        latitude = reader.GetDouble(10)
                    },
                    payment_method = (PaymentMethod)reader.GetInt32(8),
                    comments = reader.GetString(11),
                    price = reader.GetDouble(12)
                };
                orders.Add(order);
            }
            reader.Close();
            return JsonConvert.SerializeObject(orders);
        }

        // Next work on here!
        [HttpGet("/get_order")]
        public string GetOrder(int order_id){
            return "{}";
        }
    }
}
