using GarageBooking.Models;

namespace GarageBooking.Services.BookingEvent;

public interface IBookingEventService
{
    Task<List<BookingEventModel>> GetBookingEventsByPeriodAsync(DateTime startDate, DateTime endDate);
    Task<BookingEventModel> CreateBookingEventAsync(BookingEventModel model);
    Task<BookingEventModel> UpdateBookingEventAsync(BookingEventModel model);
    Task<BookingEventModel> DeleteBookingEventAsync(Guid eventId);
}