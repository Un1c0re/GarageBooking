using System.Security.Claims;
using GarageBooking.Entities;
using GarageBooking.Services.User;
using GarageBooking.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly PasswordHasher<UserEntity> _hasher = new();
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(string name, string email, string password)
    {
        var user = await _userService.GetUserAsync(email);
        if (user != null)
            return BadRequest("User already exists");

        user = new UserEntity
        { 
            Name = name,
            Email = email,
            Role = UserRole.Default,
            Password = _hasher.HashPassword(null!, password),
        };

        await _userService.SaveUserAsync(user);

        return Ok("User registered");
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(string email, string password)
    {
        var user = await _userService.GetUserAsync(email);
        if (user == null)
            return Unauthorized("Invalid email or password");

        var result = _hasher.VerifyHashedPassword(user, user.Password, password);
        if (result != PasswordVerificationResult.Success)
            return Unauthorized("Invalid email or password");

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, nameof(user.Role))
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

        return Ok("Logged in");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok("Logged out");
    }
}