using GarageBooking.Persistence;
using Microsoft.EntityFrameworkCore;

namespace GarageBookingTests.Fixtures;

public class TestDatabaseFixture : IDisposable
{
    public GarageDbContext DbContext { get; }

    public TestDatabaseFixture()
    {
        var options = new DbContextOptionsBuilder<GarageDbContext>()
            .UseInMemoryDatabase("SharedDb")
            .Options;

        DbContext = new GarageDbContext(options);
    }

    public void Dispose()
    {
        DbContext.Dispose();
    }
}