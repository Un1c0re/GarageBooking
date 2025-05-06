namespace GarageBooking.Extensions;

public static class RoleExt
{
    public static Models.Role ToModel(this Entities.Role entity)
    {
        return new Models.Role
        {
            Id = entity.Id,
            Name = entity.Name,
        };
    }

    public static Entities.Role ToEntity(this Models.Role model)
    {
        return new Entities.Role
        {
            Id = model.Id,
            Name = model.Name,
        };
    }
}