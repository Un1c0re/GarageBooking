using GarageBooking.Utils;

namespace GarageBooking.Persistence.Entities;

public class UserEntity
{
    public Guid Id { get; set; }
    public UserRole Role { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public IList<EventEntity> Events { get; set; } = new List<EventEntity>();
}