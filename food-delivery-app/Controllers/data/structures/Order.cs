using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace food_delivery_app.Controllers.data.structures
{
    public class Order
    {
        public int id;
        public int restaurant_id;
        public DateTime date;
        public Address address;
        public OrderStatus status;
    }

    public enum OrderStatus
    {
        NOT_REVIEWED,
        ACCEPTED,
        PREPARING,
        ON_THE_WAY,
        DELIVERED
    }

}
