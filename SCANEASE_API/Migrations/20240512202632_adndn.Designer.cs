﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SCANEASE_API.Models;

#nullable disable

namespace SCANEASE_API.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240512202632_adndn")]
    partial class adndn
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0-preview.1.23111.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SCANEASE_API.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 40,
                            Date = new DateTime(2024, 5, 12, 22, 26, 31, 983, DateTimeKind.Local).AddTicks(2787),
                            Quantity = 3,
                            UserId = 4
                        },
                        new
                        {
                            Id = 2,
                            Amount = 115,
                            Date = new DateTime(2024, 5, 11, 22, 26, 31, 983, DateTimeKind.Local).AddTicks(2800),
                            Quantity = 5,
                            UserId = 4
                        });
                });

            modelBuilder.Entity("SCANEASE_API.Models.OrderProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderProducts");

                    b.HasAnnotation("Relational:JsonPropertyName", "orderProduct");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            OrderId = 1,
                            ProductId = 1,
                            Quantity = 2
                        },
                        new
                        {
                            Id = -2,
                            OrderId = 1,
                            ProductId = 2,
                            Quantity = 1
                        },
                        new
                        {
                            Id = -3,
                            OrderId = 2,
                            ProductId = 3,
                            Quantity = 3
                        },
                        new
                        {
                            Id = -4,
                            OrderId = 2,
                            ProductId = 4,
                            Quantity = 2
                        });
                });

            modelBuilder.Entity("SCANEASE_API.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Ean")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InventoryBalance")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Ean = "7300156574152",
                            InventoryBalance = "10",
                            Name = "Saft",
                            Price = "10"
                        },
                        new
                        {
                            Id = 2,
                            Ean = "7300156574158",
                            InventoryBalance = "8",
                            Name = "Gurka",
                            Price = "20"
                        },
                        new
                        {
                            Id = 3,
                            Ean = "7300156574180",
                            InventoryBalance = "23",
                            Name = "Äpple",
                            Price = "15"
                        },
                        new
                        {
                            Id = 4,
                            Ean = "7300156574156",
                            InventoryBalance = "5",
                            Name = "Banan",
                            Price = "30"
                        });
                });

            modelBuilder.Entity("SCANEASE_API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PersonalNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SCANEASE_API.Models.OrderProduct", b =>
                {
                    b.HasOne("SCANEASE_API.Models.Order", "Order")
                        .WithMany("OrderProduct")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");
                });

            modelBuilder.Entity("SCANEASE_API.Models.Order", b =>
                {
                    b.Navigation("OrderProduct");
                });
#pragma warning restore 612, 618
        }
    }
}
