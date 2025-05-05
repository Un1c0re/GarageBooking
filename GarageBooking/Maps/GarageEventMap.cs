using FluentNHibernate.Mapping;
using GarageBooking.Orm.Entities;

namespace GarageBooking.Maps;

public class GarageEventMap : ClassMap<GarageEvent>
{
    public GarageEventMap()
    {
        Table("garage_events");

        Id(x => x.Id).GeneratedBy.Native();

        Map(x => x.Title).Column("title");
        Map(x => x.EventDate).Column("event_date");
        Map(x => x.StartTime).Column("start_time");
        Map(x => x.EndTime).Column("end_time");
    }
}