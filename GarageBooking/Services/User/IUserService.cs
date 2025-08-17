using GarageBooking.Models;

namespace GarageBooking.Services.User;

public interface IUserService
{
    Task<UserModel?> GetUserAsync(string keycloakId);
    Task<UserModel> SaveUserAsync(UserModel user);
}