namespace GarageBooking.Orm.Entities;

public class User
{
    public virtual long Id { get; set; }
    public virtual Role Role { get; set; }
    public virtual string Name { get; set; }
    public virtual string Email { get; set; }
    public virtual string Password { get; set; }
}
