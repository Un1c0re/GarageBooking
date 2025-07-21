using GarageBooking.Persistence;

namespace GarageBookingTests.Common;

public abstract class TestBase : IDisposable
{
    protected readonly GarageDbContext DbContext;

    protected TestBase()
    {
        DbContext = TestDbContextFactory.CreateInMemoryDbContext(Guid.NewGuid().ToString());
    }

    public void Dispose()
    {
        DbContext.Dispose();
    }
}