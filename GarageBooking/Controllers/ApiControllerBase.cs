using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ApiControllerBase : ControllerBase
{
}