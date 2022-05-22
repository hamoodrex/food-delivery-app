using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace food_delivery_app
{
    public class CustomEnvironment
    {
        private Dictionary<string,string> dict = new();
        private string file_path;
        public CustomEnvironment(string file_path = ".env"){
            this.file_path = file_path;
            this.Reload();
        }

        public string getValue(string key){
            return dict.GetValueOrDefault(key);
        }

        public void Reload(){
            dict.Clear();
            string[] lines = System.IO.File.ReadAllLines(this.file_path);
            foreach (string line in lines){
                string[] parts = line.Split("=");
                string key = parts[0];
                string value = parts[1];
                dict.Add(key,value);
            }
        }

        public string this[string input]{
            get => this.getValue(input);
        }
    }
}
