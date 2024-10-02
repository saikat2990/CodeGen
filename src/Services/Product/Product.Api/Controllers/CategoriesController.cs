using Microsoft.AspNetCore.Mvc;
using Product.Application.Features.Category.Commands;
using Product.Application.Features.Category.Queries;

namespace Product.Api.Controllers;

public class CategoriesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryCommand command)
    {
        var response = await Sender.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = response.Data }, null);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var categoryResponse = await Sender.Send(new GetCategoryByIdQuery { Id = id });
        return Ok(categoryResponse);
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await Sender.Send(new GetAllCategoryQuery());
        return Ok(categories);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Sender.Send(new DeleteCategoryCommand { Id = id });
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateCategoryCommand command)
    {
        command.Id = id;
        var updatedCategory = await Sender.Send(command);
        return Ok(updatedCategory);
    }
}
