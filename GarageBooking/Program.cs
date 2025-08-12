using GarageBooking.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Default");

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

// builder.Services.AddGarageAuth(builder.Configuration);

builder.Services
    .AddControllers()
    .AddJsonOptions(options => 
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    })
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