using System.Security.Claims;
using GarageBooking.Contracts;
using GarageBooking.Models;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;


public class AccountController : ApiControllerBase
{
    private readonly IUserService _userService;

    public AccountController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("Me")]
    public async Task<IActionResult> GetMe()
    {
        var keycloakId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (keycloakId == null)
        {
            return Unauthorized();
        }

        var user = await _userService.GetUserAsync(keycloakId);

        if (user == null)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var firstName = User.FindFirst(ClaimTypes.GivenName)?.Value;
            var lastName = User.FindFirst(ClaimTypes.Surname)?.Value;

            user = new UserModel
            {
                KeycloakId = keycloakId,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
            };

            user = await _userService.SaveUserAsync(user);
        }

        return Ok(user);
    }
}