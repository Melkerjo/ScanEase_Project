using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SCANEASE_API.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Saft", Price = "10", Ean = "7300156574152", InventoryBalance = "10" },
                new Product { Id = 2, Name = "Gurka", Price = "20", Ean = "7300156574158", InventoryBalance = "8" },
                new Product { Id = 3, Name = "Äpple", Price = "15", Ean = "7300156574180", InventoryBalance = "23" },
                new Product { Id = 4, Name = "Banan", Price = "30", Ean = "7300156574156", InventoryBalance = "5" }
            );

            modelBuilder.Entity<Order>().HasData(
                new Order
                {
                    Id = 1,
                    UserId = 4,
                    Date = DateTime.Now,
                    Quantity = 3,
                    Amount = 40,
                },
                new Order
                {
                    Id = 2,
                    UserId = 4,
                    Date = DateTime.Now.AddDays(-1),
                    Quantity = 5,
                    Amount = 115,
                }
            );

            modelBuilder.Entity<OrderProduct>().HasData(
                new OrderProduct { Id = -1, OrderId = 1, ProductId = 1, Quantity = 2 },
                new OrderProduct { Id = -2, OrderId = 1, ProductId = 2, Quantity = 1 },
                new OrderProduct { Id = -3, OrderId = 2, ProductId = 3, Quantity = 3 },
                new OrderProduct { Id = -4, OrderId = 2, ProductId = 4, Quantity = 2 }
            );

        }



    }
}
