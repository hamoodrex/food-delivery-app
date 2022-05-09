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
using System.Text.Json;

namespace food_delivery_app.Controllers
{
    [EnableCors("Policy")]
    [ApiController]
    [Route("")]
    public class HttpController : ControllerBase
    {

        private readonly ILogger<HttpController> _logger;

        public HttpController(ILogger<HttpController> logger)
        {
            _logger = logger;
        }

        [HttpPost("/restaurants")]
        public async Task<string> GetRestaurants([FromBody]object json) {
            Address address = JsonConvert.DeserializeObject<Address>(json.ToString());
            if (address == null){
                return "[]";
            }
            List<Restaurant> list = new();
            // Get from DB restaurants
            await using var cmd = new NpgsqlCommand("select id,name,description,rating from restaurants where country = ($1) and district = ($2)", Database.connection){
                Parameters = {
                    new() { Value = address.country},
                    new() { Value = address.district}
                }
            };
            await using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
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

        [HttpGet("/menu")]
        public async Task<string> GetMenu(int restaurant_id)
        {
            Restaurant restaurant = new();
            await restaurant.QueryRestaurant(restaurant_id);
            await restaurant.menu.QuerySubMenus(restaurant_id);
            foreach (SubMenu sub_menu in restaurant.menu.sub_menus)
            {
                await sub_menu.QueryItems(sub_menu.id);
            }
            return JsonConvert.SerializeObject(restaurant);
        }
        
        [HttpGet("/item")]
        public async Task<string> GetItem(int item_id)
        {
            await using var cmd = new NpgsqlCommand("select id,name,description,price from items where id = ($1)", Database.connection)
            {
                Parameters =
                {
                    new() { Value = item_id}
                }
            };
            Item item = new();
            await using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                item = new()
                {
                    id = item_id,
                    name = reader.GetString(1),
                    description = reader.GetString(2),
                    price = reader.GetDouble(3)
                };
                
            }
            await reader.DisposeAsync();
            await item.QuerySelections(item_id);
            return JsonConvert.SerializeObject(item);
        }

        [HttpGet("/order_status")]
        public async Task<string> GetStatus(int order_id)
        {
            // Security vulnerabiltiy here <-- Should we care? It's just a status!

            string query = "select status.name from orders join status on orders.status = status.id where orders.id = ($1);";
            await using var cmd = new NpgsqlCommand(query, Database.connection)
            {
                Parameters =
                {
                    new() { Value = order_id },
                }
            };
            await using var reader = await cmd.ExecuteReaderAsync();
            await reader.ReadAsync();
            try
            {
                return reader.GetString(0);
            }
            catch (Exception e)
            {
                return "{}";
            }
        }


        [HttpGet("/test")]
        public string GetHello()
        {
            byte[] value;
            bool exists = HttpContext.Session.TryGetValue("test", out value);
            if (exists)
            {
                int old_int = (int)HttpContext.Session.GetInt32("test");
                HttpContext.Session.SetInt32("test",  ++old_int);
                return old_int.ToString();
            }
            else
            {
                HttpContext.Session.SetInt32("test", 0);
                return "Hello World";
            }
        }
    }
}
