using GarageBooking.Services.GarageEvent;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GarageEventController : ControllerBase
{
    private readonly IGarageEventService _garageEventService;

    public GarageEventController(IGarageEventService garageEventService)
    {
        _garageEventService = garageEventService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetGarageEventsByDateRange(DateOnly fromDate, DateOnly toDate)
    {
        var result = await _garageEventService.GetGarageEventsByDateRange(fromDate, toDate);

        return Ok(result);
    }
}