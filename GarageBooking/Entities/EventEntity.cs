namespace GarageBooking.Entities;

public abstract class EventEntity
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }

    public Guid UserId { get; set; }
    public UserEntity User { get; set; }
    
    public bool Expired => Date < DateTime.Now;
}