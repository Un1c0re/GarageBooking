namespace GarageBooking.Extensions;

public static class GarageEventExt
{
    public static Models.GarageEvent ToModel(this Entities.GarageEvent garageEvent)
    {
        return new Models.GarageEvent
        {
            Id = garageEvent.Id,
            User = garageEvent.User.ToModel(),
            Title = garageEvent.Title,
            EventDate = garageEvent.EventDate,
            StartTime = garageEvent.StartTime,
            EndTime = garageEvent.EndTime,
        };
    }
}