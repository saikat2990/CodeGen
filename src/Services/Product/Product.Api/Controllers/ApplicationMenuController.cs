using ApplicationMenu.Application.Features.ApplicationMenu.Commands;
using ApplicationMenu.Application.Features.ApplicationMenu.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Product.Application.Features.ApplicationMenu.Commands;

namespace Product.Api.Controllers;
public class ApplicationMenuController : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var applicationMenus = await Sender.Send(new GetAllApplicationMenuQuery());
        return Ok(applicationMenus);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var applicationMenu = await Sender.Send(new GetApplicationMenuByIdQuery { Id = id });
        return Ok(applicationMenu);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdate(AddOrUpdateApplicationMenuCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? Ok(response) : BadRequest(response);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DeleteApplicationMenuCommand command)
    {
        var response = await Sender.Send(command);
        return response.IsSuccess ? NoContent() : BadRequest(response);
    }
}
