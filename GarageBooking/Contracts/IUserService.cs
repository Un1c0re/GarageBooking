using GarageBooking.Models;

namespace GarageBooking.Contracts;

public interface IUserService
{
    Task<UserModel?> GetUserAsync(string keycloakId);
    Task<UserModel> SaveUserAsync(UserModel user);
}