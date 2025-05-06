using GarageBooking.Services.User;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUser(string email)
    {
        var result = await _userService.GetUserAsync(email);
        
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> SaveUser([FromBody] Models.User user)
    {
        var result = await _userService.SaveUserAsync(user);

        return Ok(result);
    }
}