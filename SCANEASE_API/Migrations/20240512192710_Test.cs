using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SCANEASE_API.Migrations
{
    /// <inheritdoc />
    public partial class Test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 12, 21, 27, 9, 932, DateTimeKind.Local).AddTicks(178));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 5, 11, 21, 27, 9, 932, DateTimeKind.Local).AddTicks(188));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 10, 12, 33, 50, 814, DateTimeKind.Local).AddTicks(5091));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 5, 9, 12, 33, 50, 814, DateTimeKind.Local).AddTicks(5097));
        }
    }
}
