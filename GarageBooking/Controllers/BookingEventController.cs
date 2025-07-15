using GarageBooking.Models;
using GarageBooking.Services.BookingEvent;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingEventController : ControllerBase
{
    private readonly IBookingEventService _service;

    public BookingEventController(IBookingEventService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get(DateTime startDate, DateTime endDate)
    {
        var result = await _service.GetBookingEventsByPeriodAsync(startDate, endDate);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(BookingEventModel model)
    {
        try
        {
            var result = await _service.CreateBookingEventAsync(model);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(BookingEventModel model)
    {
        try
        {
            var result = await _service.UpdateBookingEventAsync(model);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _service.DeleteBookingEventAsync(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}