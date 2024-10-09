using Microsoft.AspNetCore.Mvc;
using Product.Application.Features.Product.Commands;
using Product.Application.Features.Product.Queries;

namespace Product.Api.Controllers;

public class ProductsController : BaseController
{
    [HttpPost("list")]
    public async Task<IActionResult> GetList(GetAllProductsQuery query)
    {
        var products = await Sender.Send(query);
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await Sender.Send(new GetProductByIdQuery { Id = id });
        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdate(AddOrUpdateProductCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? Ok(response) : BadRequest(response);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteProductCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? NoContent() : BadRequest(response);
    }
}
