using GarageBooking.Utils;

namespace GarageBooking.Persistence.Entities;

public class EventEntity
{
    public Guid Id { get; set; }
    public EventType EventType { get; set; }
    public string Title { get; set; }
    public EventStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public Guid UserId { get; set; }
    public UserEntity User { get; set; }
}