using GarageBooking.Models;

namespace GarageBooking.Contracts;

public interface IEventService
{
    Task<List<EventModel>> GetEventsByPeriodAsync(DateTime startDate, DateTime endDate);
    Task<EventModel> CreateEventAsync(EventModel model);
    Task<EventModel> UpdateEventAsync(EventModel model);
    Task DeleteEventAsync(long eventId);
}