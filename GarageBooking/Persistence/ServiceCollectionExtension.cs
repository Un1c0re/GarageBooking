using GarageBooking.Services.BookingEvent;
using GarageBooking.Services.User;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace GarageBooking.Persistence;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGarageServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IBookingEventService, BookingEventService>();

        return services;
    }
    
    public static IServiceCollection AddGarageAuth(this IServiceCollection services, IConfiguration cfg)
    {
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = "http://localhost:8081/realms/Garage-net";
                options.Audience = "account";
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("ProOnly", policy => policy.RequireRole("pro"));
            options.AddPolicy("AdminOnly", policy => policy.RequireRole("admin"));
        });

        return services;
    }

}