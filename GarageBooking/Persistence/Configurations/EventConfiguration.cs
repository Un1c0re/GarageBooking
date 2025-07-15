using GarageBooking.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GarageBooking.Persistence.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<EventEntity>
{
    public void Configure(EntityTypeBuilder<EventEntity> b)
    {
        b.ToTable("events");

        b.Property(x => x.EventType)
            .HasConversion<int>();

        b.Property(x => x.Status)
            .HasConversion<int>();

        b.Property(x => x.Title)
            .HasMaxLength(200);
    }
}