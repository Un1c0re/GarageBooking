using GarageBooking.Models;
using GarageBooking.Persistence.Entities;

namespace GarageBooking.Maps;

public static class UserMap
{
    public static UserModel ToModel(this UserEntity entity)
    {
        return new UserModel
        {
            Id = entity.Id,
            KeycloakId = entity.KeycloakId,
            Role = entity.Role,
            Email = entity.Email,
            Name = entity.Name,
        };
    }
}