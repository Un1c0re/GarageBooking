using GarageBooking.Extensions;
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

    public async Task<List<Models.GarageEvent>> GetGarageEventsByDateRange(DateOnly startDate, DateOnly endDate)
    {
        using var session = _sessionFactory.OpenSession();

        var garageEvents = await session.Query<Entities.GarageEvent>()
            .Where(e => e.EventDate >= startDate && e.EventDate <= endDate)
            .ToListAsync();

        return garageEvents.Select(x => x.ToModel()).ToList();
    }

    public async Task<Models.GarageEvent> SaveGarageEvent(Models.GarageEvent model)
    {
        using var session = _sessionFactory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = model.Id != default
            ? await session.GetAsync<Entities.GarageEvent>(model.Id)
            : new Entities.GarageEvent();

        entity.User = model.User.ToEntity();
        entity.Title = model.Title;
        entity.EventDate = model.EventDate;
        entity.StartTime = model.StartTime;
        entity.EndTime = model.EndTime;

        await session.SaveOrUpdateAsync(entity);
        await transaction.CommitAsync();

        return entity.ToModel();
    }

    public async Task DeleteGarageEvent(long garageEventId)
    {
        using var session = _sessionFactory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = await session.GetAsync<Entities.GarageEvent>(garageEventId);

        if (entity != null)
        {
            await session.DeleteAsync(entity);
            await transaction.CommitAsync();
        }
    }
}