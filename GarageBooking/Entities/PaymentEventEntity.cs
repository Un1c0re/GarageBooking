namespace GarageBooking.Entities;

public class PaymentEventEntity : EventEntity
{
    public DateTime PayDate { get; set; }
    
    public Guid                  BookingEventId { get; set; }
    public BookingEventEntity    Booking        { get; set; } = default!;
}