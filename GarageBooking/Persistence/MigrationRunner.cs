using Microsoft.EntityFrameworkCore;

namespace GarageBooking.Persistence;

public static class MigrationRunner
{
    public static void ApplyMigrations(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<GarageDbContext>();
        db.Database.Migrate();
    }
}