namespace GarageBooking.Services.GarageEvent;

public interface IGarageEventService
{
    Task<List<Models.GarageEvent>> GetGarageEventsByDateRange(DateOnly startDate, DateOnly endDate);
    Task<Models.GarageEvent> SaveGarageEvent(Models.GarageEvent model);
    Task DeleteGarageEvent(long garageEventId);
}