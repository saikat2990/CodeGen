using Microsoft.AspNetCore.Mvc;
using Product.Application.Features.Category.Commands;
using Product.Application.Features.Category.Queries;

namespace Product.Api.Controllers;

public class CategoriesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> AddOrUpdate(AddOrUpdateCategoryCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? Ok(response) : BadRequest(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var categoryResponse = await Sender.Send(new GetCategoryByIdQuery { Id = id });
        return Ok(categoryResponse);
    }

    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var categories = await Sender.Send(new GetAllCategoryQuery());
        return Ok(categories);
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteCategoryCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? NoContent() : BadRequest(response);
    }
}
