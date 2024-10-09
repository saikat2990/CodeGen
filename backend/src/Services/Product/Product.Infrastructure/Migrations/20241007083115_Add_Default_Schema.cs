using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Product.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Add_Default_Schema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "product");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Products",
                newSchema: "product");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Categories",
                newSchema: "product");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Products",
                schema: "product",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "Categories",
                schema: "product",
                newName: "Categories");
        }
    }
}
