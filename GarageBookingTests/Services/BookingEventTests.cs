using GarageBooking.Services.BookingEvent;
using GarageBookingTests.Common;
using GarageBookingTests.Data;

namespace GarageBookingTests.Services;

public class BookingEventServiceTests : TestBase
{
    [Fact]
    public async Task CreateBookingEventAsync_ShouldAddToDatabase()
    {
        var service = new BookingEventService(DbContext);
        var model = TestDataGenerator.BookingEventModelFaker.Generate();

        var result = await service.CreateBookingEventAsync(model);

        var stored = DbContext.Events.FirstOrDefault(e => e.Id == result.Id);
        Assert.NotNull(stored);
        Assert.Equal(model.Title, stored.Title);
    }

    [Fact]
    public async Task GetBookingEventsByPeriodAsync_ShouldReturnCorrectSubset()
    {
        var service = new BookingEventService(DbContext);
        var events = TestDataGenerator.EventEntityFaker.Generate(10);

        await DbContext.Events.AddRangeAsync(events);
        await DbContext.SaveChangesAsync();

        var from = events.Min(e => e.StartDate).AddMinutes(-1);
        var to = events.Max(e => e.EndDate).AddMinutes(1);

        var result = await service.GetBookingEventsByPeriodAsync(from, to);

        Assert.Equal(events.Count, result.Count);
    }
}