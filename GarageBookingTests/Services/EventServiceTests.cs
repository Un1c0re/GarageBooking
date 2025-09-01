using GarageBooking.Models;
using GarageBooking.Services;
using GarageBookingTests.Common;
using GarageBookingTests.Data;

namespace GarageBookingTests.Services;

public class EventServiceTests : TestBase
{
    [Fact]
    public async Task CreateBookingEventAsync_ShouldAddToDatabase()
    {
        var service = new EventService(DbContext);
        var model = TestDataGenerator.BookingEventModelFaker.Generate();

        var result = await service.CreateEventAsync(model);

        var stored = DbContext.Events.FirstOrDefault(e => e.Id == result.Id);
        Assert.NotNull(stored);
        Assert.Equal(model.Title, stored.Title);
    }

    [Fact]
    public async Task GetBookingEventsByPeriodAsync_ShouldReturnCorrectSubset()
    {
        var service = new EventService(DbContext);
        var events = TestDataGenerator.EventEntityFaker.Generate(10);

        await DbContext.Events.AddRangeAsync(events);
        await DbContext.SaveChangesAsync();

        var from = events.Min(e => e.StartDate).AddMinutes(-1);
        var to = events.Max(e => e.EndDate).AddMinutes(1);

        var filter = new RequestFilter
        {
            StartDate = from,
            EndDate = to,
        };

        var result = await service.GetEventsByPeriodAsync(filter);

        Assert.Equal(events.Count, result.Count);
    }
}