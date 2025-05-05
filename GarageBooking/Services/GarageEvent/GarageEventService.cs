using NHibernate;
using NHibernate.Linq;

namespace GarageBooking.Services.GarageEvent;

public class GarageEventService : IGarageEventService
{
    private readonly ISessionFactory _sessionFactory;

    public GarageEventService(ISessionFactory sessionFactory)
    {
        _sessionFactory = sessionFactory;
    }

    public async Task<List<Orm.Entities.GarageEvent>> GetGarageEventsByDateRange(DateOnly startDate, DateOnly endDate)
    {
        using (var session = _sessionFactory.OpenSession())
        {
            var garageEvents = await session.Query<Orm.Entities.GarageEvent>()
                .Where(e => e.EventDate >= startDate && e.EventDate <= endDate)
                .ToListAsync();
            
            return garageEvents;
        }
    }
}