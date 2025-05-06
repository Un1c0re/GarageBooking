namespace GarageBooking.Extensions;

public static class UserExt
{
    public static Models.User ToModel(this Entities.User entity)
    {
        return new Models.User
        {
            Id = entity.Id,
            Role = entity.Role.ToModel(),
            Name = entity.Name,
            Email = entity.Email,
            Password = entity.Password,
        };
    }

    public static Entities.User ToEntity(this Models.User model)
    {
        return new Entities.User
        {
            Id = model.Id,
            Role = model.Role.ToEntity(),
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
        };
    }
}