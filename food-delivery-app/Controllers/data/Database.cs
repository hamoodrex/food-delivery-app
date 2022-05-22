using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace food_delivery_app.Controllers.data
{
    public class Database
    {
        private CustomEnvironment env = new CustomEnvironment();

        public static NpgsqlConnection connection;

        public Database()
        {
            string host = env.getValue("host");
            string port = env.getValue("port");
            string username = env.getValue("username");
            string password = env.getValue("password");
            string database = env.getValue("database");

            var connString = $"Host={host};Port={port};Username={username};Database={database}";
            Connect(connString);
            
        }

        private void Connect(string connString)
        {
            connection = new NpgsqlConnection(connString);
            connection.Open();
        }
    }
}
