using GarageBooking.Services.User;

namespace GarageBooking.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGarageServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}