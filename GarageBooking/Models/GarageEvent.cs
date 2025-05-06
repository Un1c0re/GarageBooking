namespace GarageBooking.Models;

public class GarageEvent
{
    public long Id { get; set; }
    public Models.User User { get; set; }
    public string Title { get; set; }
    public DateOnly EventDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly? EndTime { get; set; }
}