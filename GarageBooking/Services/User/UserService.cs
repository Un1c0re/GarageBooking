using GarageBooking.Entities;
using Microsoft.EntityFrameworkCore;

namespace GarageBooking.Services.User;

public class UserService : IUserService
{
    private readonly GarageDbContext _db;

    public UserService(GarageDbContext db)
    {
        _db = db;
    }

    public async Task<UserEntity?> GetUserAsync(string email)
    {
        return await _db.Users
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task SaveUserAsync(UserEntity user)
    {
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
    }
}