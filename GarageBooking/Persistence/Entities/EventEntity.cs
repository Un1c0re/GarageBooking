using GarageBooking.Utils;

namespace GarageBooking.Persistence.Entities;

public class EventEntity
{
    public long Id { get; set; }
    public string Title { get; set; }
    public EventStatus Status { get; set; }
    public DateTime Date { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public long UserId { get; set; }
    public UserEntity User { get; set; }
}