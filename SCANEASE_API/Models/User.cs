using System.ComponentModel.DataAnnotations;

namespace SCANEASE_API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }

        public string PersonalNumber { get; set; }
    }
}
