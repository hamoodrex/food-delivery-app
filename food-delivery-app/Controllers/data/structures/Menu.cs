using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;

namespace food_delivery_app.Controllers.data.structures
{
    public class Menu
    {
        public List<SubMenu> sub_menus;

        public void QuerySubMenus(int restaurant_id)
        {
            lock(Database.connection){
                sub_menus = new List<SubMenu>();
                string query = "select sub_menus.id, sub_menus.title from restaurants join sub_menus on sub_menus.restaurant_id = restaurants.id where restaurants.id = ($1);";
                using var cmd = new NpgsqlCommand(query, Database.connection)
                {
                    Parameters =
                    {
                        new() {Value = restaurant_id}
                    }
                };
                cmd.Prepare();
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    SubMenu sub_menu = new SubMenu()
                    {
                        id =reader.GetInt32(0),
                        title =reader.GetString(1),
                    };
                    sub_menus.Add(sub_menu);
                }
            }

        }
    }

    public class SubMenu
    {
        public int id;
        public string title;
        public List<Item> items;

        public void QueryItems(int id)
        {
            lock(Database.connection){
                this.id = id;
                items = new List<Item>();
                string query = "select items.id,items.name,items.description,items.price from sub_menus join items on sub_menus.id = items.sub_menu_id where sub_menus.id = ($1);";
                using var cmd = new NpgsqlCommand(query, Database.connection)
                {
                    Parameters =
                    {
                        new() {Value = id}
                    }
                };
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Item item = new Item()
                    {
                        id=reader.GetInt32(0),
                        name=reader.GetString(1),
                        description=reader.GetString(2),
                        price=reader.GetDouble(3),
                    };
                    items.Add(item);
                }
            }
        }
    }
}
