using Bogus;
using GarageBooking.Models;
using GarageBooking.Persistence.Entities;
using GarageBooking.Utils;

namespace GarageBookingTests.Data;
    
public static class TestDataGenerator
{
    public static Faker<EventEntity> EventEntityFaker => new Faker<EventEntity>()
        .RuleFor(e => e.Id, f => f.IndexGlobal + 1)
        .RuleFor(e => e.Title, f => f.Lorem.Sentence(3))
        .RuleFor(e => e.StartDate, f => f.Date.Soon())
        .RuleFor(e => e.EndDate, (f, e) => e.StartDate.AddHours(f.Random.Int(1, 3)))
        .RuleFor(e => e.UserId, f => f.IndexGlobal + 1)
        .RuleFor(e => e.Status, f => f.PickRandom<EventStatus>());

    public static Faker<BookingEventModel> BookingEventModelFaker => new Faker<BookingEventModel>()
        .RuleFor(e => e.Id, f => f.IndexGlobal + 1)
        .RuleFor(e => e.Title, f => f.Lorem.Sentence(2))
        .RuleFor(e => e.StartDate, f => f.Date.Soon())
        .RuleFor(e => e.EndDate, (f, e) => e.StartDate.AddHours(2))
        .RuleFor(e => e.UserId, f => f.IndexGlobal + 1)
        .RuleFor(e => e.Status, f => f.PickRandom<EventStatus>());
}