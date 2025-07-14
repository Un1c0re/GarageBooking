using GarageBooking.Utils;

namespace GarageBooking.Entities;

public class BookingEventEntity : EventEntity
{
    public string Title { get; set; }
    public BookingEventStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public PaymentEventEntity? Payment { get; set; }
}