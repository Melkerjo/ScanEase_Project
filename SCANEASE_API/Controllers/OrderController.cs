using Microsoft.AspNetCore.Mvc;
using SCANEASE_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace SCANEASE_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrders()
        {
            return _context.Orders.ToList();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public ActionResult<Order> GetOrder(int id)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: api/Order
        [HttpPost]
        public ActionResult<Order> PostOrder(Order order)
        {
            // Loop through each order product to update inventory balance
            foreach (var orderProduct in order.OrderProduct)
            {
                var product = _context.Products.Find(orderProduct.ProductId);
                if (product != null)
                {
                    // Convert InventoryBalance to an int value
                    if (int.TryParse(product.InventoryBalance, out int inventoryBalance))
                    {
                        // Reduce inventory balance by the quantity sold
                        inventoryBalance -= orderProduct.Quantity;
                        product.InventoryBalance = inventoryBalance.ToString();
                    }
                    else
                    {
                        return BadRequest($"Inventory balance for product with ID {orderProduct.ProductId} is not a valid integer value.");
                    }
                }
                else
                {
                    return BadRequest($"Product with ID {orderProduct.ProductId} not found.");
                }
            }

            _context.Orders.Add(order);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }



        // PUT: api/Order/5
        [HttpPut("{id}")]
        public IActionResult PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { Id = id });
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();

            return NoContent();
        }

        // GET: api/Order/user/{userId}
        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<Order>> GetOrdersByUserId(int userId)
        {
            var orders = _context.Orders
                 .Include(o => o.OrderProduct)
                     .ThenInclude(op => op.Product) 
                 .Where(o => o.UserId == userId)
                 .ToList();

            if (orders == null || orders.Count == 0)
            {
                return NotFound();
            }

            JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
            {
                WriteIndented = true
            };

            var jsonString = JsonSerializer.Serialize(orders, options);


            return Content(jsonString, "application/json");
        }

    }
}
