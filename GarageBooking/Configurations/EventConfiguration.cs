using GarageBooking.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GarageBooking.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<EventEntity>
{
    public void Configure(EntityTypeBuilder<EventEntity> b)
    {
        b.ToTable("events");

        b.HasDiscriminator<string>("type")
            .HasValue<BookingEventEntity>("booking")
            .HasValue<PaymentEventEntity>("payment");

        b.Property("type").HasMaxLength(16);

        b.HasIndex(e => e.Date);
    }
}
