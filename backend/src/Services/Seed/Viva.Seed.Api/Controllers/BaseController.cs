using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Viva.Seed.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseController : ControllerBase
{
    private ISender _sender;
    protected ISender Sender => _sender ?? (_sender = HttpContext.RequestServices.GetRequiredService<ISender>());
}
