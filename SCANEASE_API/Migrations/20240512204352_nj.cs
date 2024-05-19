using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SCANEASE_API.Migrations
{
    /// <inheritdoc />
    public partial class nj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 12, 22, 43, 52, 615, DateTimeKind.Local).AddTicks(1453));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 5, 11, 22, 43, 52, 615, DateTimeKind.Local).AddTicks(1469));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 12, 22, 42, 35, 525, DateTimeKind.Local).AddTicks(1119));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 5, 11, 22, 42, 35, 525, DateTimeKind.Local).AddTicks(1129));
        }
    }
}
