using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SCANEASE_API.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [JsonPropertyName("orderProduct")] // Använd för att justera JSON-namnet
        public ICollection<OrderProduct> OrderProduct { get; set; } = new List<OrderProduct>();

        public int Quantity { get; set; }
        public int Amount { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;
    }

    public class OrderProduct
    {
        [Key]
        
        public int Id { get; set; }

        [ForeignKey("Order")]
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
        [ForeignKey("Product")] // Lägg till en koppling till produkter
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
