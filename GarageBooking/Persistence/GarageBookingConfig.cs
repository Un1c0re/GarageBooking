using GarageBooking.Services.GarageEvent;

namespace GarageBooking.Persistence;

public static class GarageBookingConfig
{
    public static IServiceCollection AddGarageBookingServices(this IServiceCollection services)
    {
        services.AddScoped<IGarageEventService, GarageEventService>();

        return services;
    }
}