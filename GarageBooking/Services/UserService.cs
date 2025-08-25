using GarageBooking.Contracts;
using GarageBooking.Maps;
using GarageBooking.Models;
using GarageBooking.Persistence;
using GarageBooking.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace GarageBooking.Services;

public class UserService : IUserService
{
    private readonly GarageDbContext _dbContext;

    public UserService(GarageDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserModel?> GetUserAsync(string keycloakId)
    {
        var entity = await _dbContext.Users.SingleOrDefaultAsync(u => u.KeycloakId == keycloakId);

        return entity?.ToModel();
    }

    public async Task<UserModel> SaveUserAsync(UserModel model)
    {
        var entity = new UserEntity
        {
            KeycloakId = model.KeycloakId,
            Role = model.Role,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Email = model.Email
        };

        _dbContext.Users.Add(entity);
        await _dbContext.SaveChangesAsync();

        return entity.ToModel();
    }
}