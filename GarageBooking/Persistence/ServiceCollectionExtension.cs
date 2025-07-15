using GarageBooking.Services.BookingEvent;
using GarageBooking.Services.User;

namespace GarageBooking.Persistence;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGarageServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IBookingEventService, BookingEventService>();

        return services;
    }
}