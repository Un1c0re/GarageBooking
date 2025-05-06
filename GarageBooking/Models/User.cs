namespace GarageBooking.Models;

public class User
{
    public long Id { get; set; }
    public Models.Role Role { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}