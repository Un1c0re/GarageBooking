using GarageBooking.Models;
using GarageBooking.Persistence.Entities;

namespace GarageBooking.Maps;

public static class BookingEventMap
{
    public static BookingEventModel ToModel(this EventEntity entity)
    {
        return new BookingEventModel
        {
            Id = entity.Id,
            Title = entity.Title,
            Status = entity.Status,
            StartDate = entity.StartDate,
            EndDate = entity.EndDate,
            UserId = entity.UserId,
        };
    }
}