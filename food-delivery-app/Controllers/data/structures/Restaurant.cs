using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;

namespace food_delivery_app.Controllers.data.structures
{
    public class Restaurant
    {
        public int id;
        public string name;
        public string description;
        public double rating; // Rating 0.0 to 10 <-- with precision of 1 floating point
        public Menu menu = new Menu();
        public Address address;

        public async Task QueryRestaurant(int id)
        {
            this.id = id;
            string query = "select name,description,rating,country,district,city from restaurants where restaurants.id = ($1);";

            await using var cmd = new NpgsqlCommand(query, Database.connection)
            {
                Parameters =
                {
                    new() { Value = id },
                }
            };
            await using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                name = reader.GetString(0);
                description = reader.GetString(1);
                rating = reader.GetDouble(2);
                address = new Address()
                {
                    country = reader.GetString(3),
                    district = reader.GetString(4),
                    city = reader.GetString(5),
                };
            }
        }

    }
}
