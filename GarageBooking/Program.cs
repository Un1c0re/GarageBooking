using GarageBooking.Persistence;
using GarageBooking.Services.GarageEvent;
using NHibernate;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Default") 
                       ?? "Host=postgres;Port=5432;Database=garagedb;Username=admin;Password=admin";

builder.Services.AddSingleton<ISessionFactory>(_ => SessionFactoryBuilder.CreateSessionFactory(connectionString));
builder.Services.AddScoped(factory =>
{
    var sessionFactory = factory.GetRequiredService<ISessionFactory>();
    return sessionFactory.OpenSession();
});

builder.Services.AddScoped<IGarageEventService, GarageEventService>();

builder.Services.AddDatabaseMigrations(connectionString);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();
// MigrationSetup.ApplyMigrations(app.Services);

if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


app.Run();
