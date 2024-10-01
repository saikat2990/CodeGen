using Microsoft.AspNetCore.Mvc;
using Product.Application.Features.Category.Commands;
using Product.Application.Features.Category.Queries;

namespace Product.Api.Controllers;

public class CategoriesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryCommand command)
    {
        var categoryId = await Sender.Send(command);
        return CreatedAtAction(nameof(GetCategory), new { id = categoryId }, null);
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await Sender.Send(new GetAllCategoryQuery());
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        var category = await Sender.Send(new GetCategoryByIdQuery { Id = id });
        return Ok(category);
    }
}
