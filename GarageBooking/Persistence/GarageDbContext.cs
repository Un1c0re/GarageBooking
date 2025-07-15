using GarageBooking.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace GarageBooking.Persistence;

public class GarageDbContext : DbContext
{
    public GarageDbContext(DbContextOptions<GarageDbContext> options) : base(options)
    {
    }

    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<EventEntity> Events => Set<EventEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);

        modelBuilder.Entity<EventEntity>()
            .HasQueryFilter(e => !EF.Property<bool>(e, "IsDeleted"));
    }
}