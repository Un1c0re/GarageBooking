using GarageBooking.Persistence;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("db")
                       ?? "Host=postgres;Port=5432;Database=garagedb;Username=admin;Password=admin";

builder.Services.AddDbContext<GarageDbContext>(opt =>
{
    opt.UseNpgsql(connectionString,
        npg => npg.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));

    if (builder.Environment.IsDevelopment())
    {
        opt.EnableSensitiveDataLogging()
            .EnableDetailedErrors();
    }
});

builder.Services.AddGarageServices();

builder.Services.AddGarageAuth(builder.Configuration);

builder.Services
    .AddControllers()
    .Services
    .AddOpenApi();

var app = builder.Build();

MigrationRunner.ApplyMigrations(app);

if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();