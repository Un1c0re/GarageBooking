using GarageBooking.Entities;
using Microsoft.EntityFrameworkCore;

namespace GarageBooking;

public class GarageDbContext : DbContext
{
    public GarageDbContext(DbContextOptions<GarageDbContext> options)
        : base(options) { }

    public DbSet<UserEntity>           Users    => Set<UserEntity>();
    public DbSet<EventEntity>          Events   => Set<EventEntity>();
    public DbSet<BookingEventEntity>   Bookings => Set<BookingEventEntity>();
    public DbSet<PaymentEventEntity>   Payments => Set<PaymentEventEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);

        modelBuilder.Entity<EventEntity>()
            .HasQueryFilter(e => !EF.Property<bool>(e, "IsDeleted"));
    }
}
