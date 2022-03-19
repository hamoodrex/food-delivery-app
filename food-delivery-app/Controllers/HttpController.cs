using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace food_delivery_app.Controllers
{
    [ApiController]
    [Route("")]
    public class HttpController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<HttpController> _logger;

        public HttpController(ILogger<HttpController> logger)
        {
            _logger = logger;
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
