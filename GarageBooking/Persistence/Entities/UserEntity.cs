using GarageBooking.Utils;

namespace GarageBooking.Persistence.Entities;

public class UserEntity
{
    public long Id { get; set; }
    public string KeycloakId { get; set; }
    public UserRole Role { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public IList<EventEntity> Events { get; set; } = new List<EventEntity>();
}