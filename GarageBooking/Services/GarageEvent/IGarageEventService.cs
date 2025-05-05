namespace GarageBooking.Services.GarageEvent;

public interface IGarageEventService
{
    Task<List<Orm.Entities.GarageEvent>> GetGarageEventsByDateRange(DateOnly startDate, DateOnly endDate);
}