using GarageBooking.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GarageBooking.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> b)
    {
        b.ToTable("users");

        b.HasKey(u => u.Id);
        b.Property(u => u.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        b.Property(u => u.Role)
            .HasConversion<int>();

        b.HasIndex(u => u.Email).IsUnique();

        b.HasMany(u => u.Events)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}