using GarageBooking.Utils;

namespace GarageBooking.Models;

public class UserModel
{
    public long Id { get; set; }
    public string KeycloakId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public UserRole Role { get; set; }
}