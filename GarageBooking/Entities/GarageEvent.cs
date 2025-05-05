namespace GarageBooking.Orm.Entities;

public class GarageEvent
{
    public virtual long Id { get; set; }
    public virtual string Title { get; set; }
    public virtual DateOnly EventDate { get; set; }
    public virtual TimeOnly StartTime { get; set; }
    public virtual TimeOnly? EndTime { get; set; }
}