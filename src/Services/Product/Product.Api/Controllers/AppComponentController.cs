using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Product.Application.Features.AppComponent.Commands;
using Product.Application.Features.AppComponent.Queries;

namespace Product.Api.Controllers;

public class AppComponentController : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var appComponents = await Sender.Send(new GetAllAppComponentQuery());
        return Ok(appComponents);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var appComponent = await Sender.Send(new GetAppComponentByIdQuery { Id = id });
        return Ok(appComponent);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdate(AddOrUpdateAppComponentCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? Ok(response) : BadRequest(response);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteAppComponentCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? NoContent() : BadRequest(response);
    }
}
