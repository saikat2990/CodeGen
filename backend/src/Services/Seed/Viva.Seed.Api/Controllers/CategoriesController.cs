using Microsoft.AspNetCore.Mvc;
using Viva.Seed.Application.Features.Categories.Commands;
using Viva.Seed.Application.Features.Categories.Queries;

namespace Viva.Seed.Api.Controllers;

public class CategoriesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetList(GetAllCategoryQuery command)
    {
        var categories = await Sender.Send(command);
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var categoryResponse = await Sender.Send(new GetCategoryByIdQuery { Id = id });
        return Ok(categoryResponse);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdate(AddOrUpdateCategoryCommand command)
    {
        var response = await Sender.Send(command);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteCategoryCommand command)
    {
        var response = await Sender.Send(command);
        return response.Success ? NoContent() : BadRequest(response);
    }
}
