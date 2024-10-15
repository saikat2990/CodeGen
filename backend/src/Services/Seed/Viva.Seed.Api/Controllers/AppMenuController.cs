
using Microsoft.AspNetCore.Mvc;
using Viva.Seed.Application.Features.ApplicationMenu.Commands;
using Viva.Seed.Application.Features.ApplicationMenu.Queries;

namespace Viva.Seed.Api.Controllers;

public class AppMenuController : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var applicationMenus = await Sender.Send(new GetAllApplicationMenuQuery());
        return Ok(applicationMenus);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var applicationMenu = await Sender.Send(new GetApplicationMenuByIdQuery { Id = id });
        return Ok(applicationMenu);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdate(AddOrUpdateApplicationMenuCommand command)
    {
        var response = await Sender.Send(command);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteApplicationMenuCommand command)
    {
        var response = await Sender.Send(command);
        return response.Success ? NoContent() : BadRequest(response);
    }
}
