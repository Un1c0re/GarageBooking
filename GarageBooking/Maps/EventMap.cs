using GarageBooking.Models;
using GarageBooking.Persistence.Entities;

namespace GarageBooking.Maps;

public static class EventMap
{
    public static EventModel ToModel(this EventEntity entity)
    {
        return new EventModel
        {
            Id = entity.Id,
            Title = entity.Title,
            Status = entity.Status,
            Date = entity.Date,
            StartDate = entity.StartDate,
            EndDate = entity.EndDate,
            User = entity.User.ToModel()
        };
    }
}