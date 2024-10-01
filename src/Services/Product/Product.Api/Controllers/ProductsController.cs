﻿using Microsoft.AspNetCore.Mvc;
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

    //[HttpGet("{id}")]
    //public async Task<IActionResult> GetProduct(int id)
    //{
    //    var product = await Sender.Send(new GetProductQuery { Id = id });
    //    return Ok(product);
    //}

    //[HttpPost]
    //public async Task<IActionResult> CreateProduct(CreateProductCommand command)
    //{
    //    var productId = await Sender.Send(command);
    //    return CreatedAtAction(nameof(GetProduct), new { id = productId }, null);
    //}

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
