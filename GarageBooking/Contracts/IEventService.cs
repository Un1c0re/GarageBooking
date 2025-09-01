using GarageBooking.Models;

namespace GarageBooking.Contracts;

public interface IEventService
{
    Task<List<EventModel>> GetEventsByPeriodAsync(RequestFilter filter);
    Task<EventModel> CreateEventAsync(EventModel model);
    Task<EventModel> UpdateEventAsync(EventModel model);
    Task DeleteEventAsync(long eventId);
}