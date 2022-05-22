using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;

namespace food_delivery_app.Controllers.data.structures
{
    public class Item
    {
        public int id;
        public string name;
        public string description;
        public double price;
        public int quantity;

        public List<Selection> selections;

        public void QuerySelections(int id)
        {
            lock(Database.connection){
                this.id = id;
                selections = new List<Selection>();
                string query = @"select selections.id,selections.name,selections.optional,selections.price 
                            from items join selections on items.id = selections.item_id where items.id = ($1);";

                using var cmd = new NpgsqlCommand(query, Database.connection)
                {
                    Parameters =
                    {
                        new() {Value = id}
                    }
                };
                cmd.Prepare();
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Selection selection = new Selection()
                    {
                        id = reader.GetInt32(0),
                        name = reader.GetString(1),
                        optional = reader.GetBoolean(2),
                        price = reader.GetDouble(3),
                    };
                    selections.Add(selection);
                }
            }
            
        }

    }

    public class Selection
    {
        public int id;
        public string name;
        public bool optional = false;
        public double price;
    }
}
