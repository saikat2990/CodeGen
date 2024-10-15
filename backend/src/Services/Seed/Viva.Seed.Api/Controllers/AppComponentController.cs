using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Viva.Seed.Application.Features.AppComponents.Commands;
using Viva.Seed.Application.Features.AppComponents.Queries;

namespace Viva.Seed.Api.Controllers;
public class AppComponentController : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetList(GetAllAppComponentQuery query)
    {
        var appComponents = await Sender.Send(query);
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
