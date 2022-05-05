using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace food_delivery_app.Controllers.data
{
    public class Database
    {
        public string host = "localhost";
        public string port = "5432";
        public string username = "postgres";
        public string password = "";
        public string database = "food_app";

        public static NpgsqlConnection connection;

        public Database()
        {

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
