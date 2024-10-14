using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Viva.Seed.Application.Features.AppComponent.Commands;
using Viva.Seed.Application.Features.AppComponent.Queries;

namespace Viva.Seed.Api.Controllers;
public class AppComponentController : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var appComponents = await Sender.Send(new GetAllAppComponentQuery());
        return Ok(appComponents);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var appComponent = await Sender.Send(new GetAppComponentByIdQuery { Id = id });
        return Ok(appComponent);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdate(AddOrUpdateAppComponentCommand command)
    {
        var response = await Sender.Send(command);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteAppComponentCommand command)
    {
        var response = await Sender.Send(command);
        return response.Success ? NoContent() : BadRequest(response);
    }
}
