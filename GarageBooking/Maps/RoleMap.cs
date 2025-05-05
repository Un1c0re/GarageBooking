using FluentNHibernate.Mapping;
using GarageBooking.Orm.Entities;

namespace GarageBooking.Maps;

public class RoleMap : ClassMap<Role>
{
    public RoleMap()
    {
        Table("roles");
        
        Id(x => x.Id).GeneratedBy.Native();
        Map(x => x.Name).Column("name");
    }
}