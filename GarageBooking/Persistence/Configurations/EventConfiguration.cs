using GarageBooking.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GarageBooking.Persistence.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<EventEntity>
{
    public void Configure(EntityTypeBuilder<EventEntity> builder)
    {
        builder.ToTable("events");

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Title)
            .HasMaxLength(200);

        builder.HasOne(x => x.User)
            .WithMany(u => u.Events)
            .HasForeignKey(x => x.UserId)
            .HasPrincipalKey(u => u.Id);
    }
}