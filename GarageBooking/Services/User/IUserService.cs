namespace GarageBooking.Services.User;

public interface IUserService
{
    Task<Models.User> GetUserAsync(string email);

    Task<Models.User> SaveUserAsync(Models.User user);
}