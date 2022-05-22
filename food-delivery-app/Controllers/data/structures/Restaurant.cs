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

        public void QueryRestaurant(int id)
        {
            lock(Database.connection)
            {
                this.id = id;
                string query = "select name,description,rating,country,district from restaurants where restaurants.id = ($1);";

                using var cmd = new NpgsqlCommand(query, Database.connection)
                {
                    Parameters =
                    {
                        new() { Value = id },
                    }
                };
                cmd.Prepare();
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    name = reader.GetString(0);
                    description = reader.GetString(1);
                    rating = reader.GetDouble(2);
                    address = new Address()
                    {
                        country = reader.GetString(3),
                        district = reader.GetString(4),
                    };
                }
            }

        }

    }
}
