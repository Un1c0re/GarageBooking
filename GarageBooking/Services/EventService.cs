using System.Data.Entity.Core;
using GarageBooking.Contracts;
using GarageBooking.Maps;
using GarageBooking.Models;
using GarageBooking.Persistence;
using GarageBooking.Persistence.Entities;
using GarageBooking.Utils;
using Microsoft.EntityFrameworkCore;

namespace GarageBooking.Services;

public class EventService : IEventService
{
    private readonly GarageDbContext _dbContext;

    public EventService(GarageDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<EventModel>> GetEventsByPeriodAsync(DateTime startDate, DateTime endDate)
    {
        var entities = await _dbContext.Events
            .Include(x => x.User) 
            .Where(x => x.Date >= startDate && x.EndDate <= endDate)
            .ToListAsync();

        return entities.Select(e => e.ToModel()).ToList();
    }

    public async Task<EventModel> CreateEventAsync(EventModel model)
    {
        var entity = new EventEntity
        {
            Title = model.Title,
            StartDate = model.StartDate,
            EndDate = model.EndDate,
            UserId = model.User.Id
        };

        _dbContext.Events.Add(entity);
        await _dbContext.SaveChangesAsync();

        model.Id = entity.Id;

        return model;
    }

    public async Task<EventModel> UpdateEventAsync(EventModel model)
    {
        var entity = await _dbContext.Events.SingleOrDefaultAsync(x => x.Id == model.Id);
        if (entity == null)
        {
            throw new ObjectNotFoundException($"Запись '{model.Title}' не найдена");
        }

        entity.Title = model.Title;
        entity.Status = model.Status;

        if (entity.Status == EventStatus.Pending)
        {
            entity.StartDate = model.StartDate;
            entity.EndDate = model.EndDate;
        }

        _dbContext.Events.Update(entity);
        await _dbContext.SaveChangesAsync();

        return model;
    }

    public async Task DeleteEventAsync(long eventId)
    {
        var entity = await _dbContext.Events.SingleOrDefaultAsync(x => x.Id == eventId);

        if (entity == null)
        {
            throw new ObjectNotFoundException($"Запись с Id'{eventId}' не найдена");
        }

        _dbContext.Events.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}