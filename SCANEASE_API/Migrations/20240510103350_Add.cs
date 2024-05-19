using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SCANEASE_API.Migrations
{
    /// <inheritdoc />
    public partial class Add : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Amount", "Date", "Quantity", "UserId" },
                values: new object[,]
                {
                    { 1, 40, new DateTime(2024, 5, 10, 12, 33, 50, 814, DateTimeKind.Local).AddTicks(5091), 3, 4 },
                    { 2, 115, new DateTime(2024, 5, 9, 12, 33, 50, 814, DateTimeKind.Local).AddTicks(5097), 5, 4 }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Ean", "InventoryBalance", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "7300156574152", "10", "Saft", "10" },
                    { 2, "7300156574158", "8", "Gurka", "20" },
                    { 3, "7300156574180", "23", "Äpple", "15" },
                    { 4, "7300156574156", "5", "Banan", "30" }
                });

            migrationBuilder.InsertData(
                table: "OrderProduct",
                columns: new[] { "Id", "OrderId", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { -4, 2, 4, 2 },
                    { -3, 2, 3, 3 },
                    { -2, 1, 2, 1 },
                    { -1, 1, 1, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "OrderProduct",
                keyColumn: "Id",
                keyValue: -4);

            migrationBuilder.DeleteData(
                table: "OrderProduct",
                keyColumn: "Id",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "OrderProduct",
                keyColumn: "Id",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "OrderProduct",
                keyColumn: "Id",
                keyValue: -1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
