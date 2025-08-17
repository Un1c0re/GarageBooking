using GarageBooking.Models;
using GarageBooking.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IUserService _userService;

    public AccountController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var keycloakId = User.FindFirst("sub")?.Value;
        var email = User.FindFirst("email")?.Value;

        if (keycloakId == null || email == null)
        {
            return Unauthorized();
        }

        var user = await _userService.GetUserAsync(keycloakId);

        if (user == null)
        {
            user = new UserModel
            {
                KeycloakId = keycloakId!,
                Email = email,
            };

            user = await _userService.SaveUserAsync(user);
        }

        return Ok(user);
    }
}