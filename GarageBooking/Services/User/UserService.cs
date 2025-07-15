using GarageBooking.Persistence;
using GarageBooking.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace GarageBooking.Services.User;

public class UserService : IUserService
{
    private readonly GarageDbContext _dbContext;

    public UserService(GarageDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserEntity?> GetUserAsync(string email)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task SaveUserAsync(UserEntity user)
    {
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
    }
}