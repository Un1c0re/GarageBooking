using GarageBooking.Contracts;
using GarageBooking.Models;
using Microsoft.AspNetCore.Mvc;

namespace GarageBooking.Controllers;

public class EventController : ApiControllerBase
{
    private readonly IEventService _service;

    public EventController(IEventService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get(DateTime startDate, DateTime endDate)
    {
        var result = await _service.GetEventsByPeriodAsync(startDate, endDate);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(EventModel model)
    {
        try
        {
            var result = await _service.CreateEventAsync(model);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(EventModel model)
    {
        try
        {
            var result = await _service.UpdateEventAsync(model);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long id)
    {
        try
        {
            var result = await _service.DeleteEventAsync(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}