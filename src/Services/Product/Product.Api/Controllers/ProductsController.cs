using Microsoft.AspNetCore.Mvc;
using Product.Application.Features.Product.Commands;
using Product.Application.Features.Product.Queries;

namespace Product.Api.Controllers;

public class ProductsController : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await Sender.Send(new GetAllProductsQuery());
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await Sender.Send(new GetProductByIdQuery { Id = id });
        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductCommand command)
    {
        var response = await Sender.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = response.Data }, null);
    }

    //[HttpPut("{id}")]
    //public async Task<IActionResult> UpdateProduct(int id, UpdateProductCommand command)
    //{
    //    command.Id = id;
    //    await Sender.Send(command);
    //    return NoContent();
    //}

    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteProduct(int id)
    //{
    //    await Sender.Send(new DeleteProductCommand { Id = id });
    //    return NoContent();
    //}
}
