using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SCANEASE_API.Migrations
{
    /// <inheritdoc />
    public partial class js : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 12, 22, 33, 58, 45, DateTimeKind.Local).AddTicks(9433));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 5, 11, 22, 33, 58, 45, DateTimeKind.Local).AddTicks(9448));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 12, 22, 26, 31, 983, DateTimeKind.Local).AddTicks(2787));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 5, 11, 22, 26, 31, 983, DateTimeKind.Local).AddTicks(2800));
        }
    }
}
