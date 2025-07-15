using GarageBooking.Utils;

namespace GarageBooking.Models;

public class BookingEventModel
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public EventStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public Guid UserId { get; set; }
}