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
        public long date;
        public Address address;
        public OrderStatus status = OrderStatus.NOT_REVIEWED;
        public PaymentMethod payment_method;
        public double price;
        public List<Item> cart;
        public string comments;
    }

    public enum PaymentMethod{
        CASH,
        CREDIT_CARD
    }

    public enum OrderStatus
    {
        NOT_REVIEWED,
        ACCEPTED,
        PREPARING,
        ON_THE_WAY,
        DELIVERED,
        REJECTED
    }

}
