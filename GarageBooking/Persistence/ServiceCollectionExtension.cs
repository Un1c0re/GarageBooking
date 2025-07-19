using GarageBooking.Services.BookingEvent;
using GarageBooking.Services.User;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;

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
        var section = cfg.GetSection("Auth");

        services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "oidc";
            })
            .AddCookie()
            .AddOpenIdConnect("oidc", options =>
            {
                options.Authority = section["Authority"];
                options.ClientId = section["ClientId"];
                options.ClientSecret = section["ClientSecret"];
                options.ResponseType = section["ResponseType"] ?? "code";

                options.SaveTokens = true;
                options.GetClaimsFromUserInfoEndpoint = true;

                options.Scope.Add("roles");
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    RoleClaimType = "role"
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminOnly", p =>
                p.RequireRole("admin"));
        });

        return services;
    }

}