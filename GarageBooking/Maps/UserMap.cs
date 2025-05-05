using FluentNHibernate.Mapping;
using GarageBooking.Orm.Entities;

namespace GarageBooking.Maps;

public class UserMap : ClassMap<User>
{
    public UserMap()
    {
        Table("users");
        
        Id(x => x.Id).GeneratedBy.Native();
        
        Map(x => x.Name).Column("name");
        Map(x => x.Email).Column("email");
        Map(x => x.Password).Column("password");

        References(x => x.Role).Column("role_id");
    }
}