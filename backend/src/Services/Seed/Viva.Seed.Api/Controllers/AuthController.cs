using Microsoft.AspNetCore.Mvc;
using Viva.Seed.Application.Features.Auth.Commands;

namespace Viva.Seed.Api.Controllers;

public class AuthController : BaseController
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command)
    {
        var response = await Sender.Send(command);

        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var response = await Sender.Send(command);

        return response.Success ? Ok(response) : BadRequest(response);
    }
}
