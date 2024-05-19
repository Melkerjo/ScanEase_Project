using System.ComponentModel.DataAnnotations;

namespace SCANEASE_API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Price { get; set; }
        public string Ean { get; set; }
        public string InventoryBalance { get; set; }

    }
}
