using GarageBooking.Contracts;
using GarageBooking.Services;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace GarageBooking.Persistence;

public static class ProjectConfiguration
{
    public static IServiceCollection AddGarageServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IEventService, EventService>();

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
                options.Authority = cfg["Authentication:Authority"];
                options.Audience = cfg["Authentication:Audience"];
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true
                };
            });

        services.AddAuthorizationBuilder()
            .AddPolicy("ProOnly", policy => policy.RequireRole("pro"))
            .AddPolicy("AdminOnly", policy => policy.RequireRole("admin"));

        return services;
    }
}