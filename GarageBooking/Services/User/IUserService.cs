using GarageBooking.Entities;

namespace GarageBooking.Services.User;

public interface IUserService
{
    Task<UserEntity?> GetUserAsync(string email);
    Task SaveUserAsync(UserEntity user);
}