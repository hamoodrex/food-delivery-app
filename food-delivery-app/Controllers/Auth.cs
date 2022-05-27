using Npgsql;
using food_delivery_app.Controllers.data;
using food_delivery_app.Controllers;

namespace food_delivery_app{
    public class Auth{
        public static bool ConfirmRestaurantCredentials(dynamic credentials, int restaurant_id, out bool owner){
                // object contains credentials.email & credentials.password
                string email = credentials.email;
                string hashed_password = PasswordHasher.hash((string)credentials.password, HttpController.env["salt"]);
                using var cmd = new NpgsqlCommand("select restaurant_id,is_owner from users where email = ($1) and password = ($2)", Database.connection){
                    Parameters = {
                        new() {Value = email},
                        new() {Value = hashed_password}
                    }
                };
                int count = 0;
                bool is_owner = false;
                bool is_restaurant = false;
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    if (reader.GetInt32(0) == restaurant_id) is_restaurant = true;
                    if (reader.GetBoolean(1)) is_owner = true;
                    count++;
                }
                reader.Close();
                owner = is_owner;
                if (count == 0) return false;
                return is_restaurant;
            }
    }
}
