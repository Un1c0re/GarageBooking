using Microsoft.EntityFrameworkCore;
using GarageBooking.Persistence;

namespace GarageBookingTests.Common;

public static class TestDbContextFactory
{
    public static GarageDbContext CreateInMemoryDbContext(string dbName)
    {
        var options = new DbContextOptionsBuilder<GarageDbContext>()
            .UseInMemoryDatabase(databaseName: dbName)
            .Options;

        return new GarageDbContext(options);
    }
}