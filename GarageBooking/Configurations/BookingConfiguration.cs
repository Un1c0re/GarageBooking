using GarageBooking.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GarageBooking.Configurations;

public class BookingConfiguration : IEntityTypeConfiguration<BookingEventEntity>
{
    public void Configure(EntityTypeBuilder<BookingEventEntity> b)
    {
        b.Property(x => x.Status)
            .HasConversion<int>();

        b.Property(x => x.Title)
            .HasMaxLength(200);

        b.HasIndex(x => new { x.StartDate, x.EndDate });

        b.HasOne(x => x.Payment)
            .WithOne(p => p.Booking)
            .HasForeignKey<PaymentEventEntity>(p => p.BookingEventId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
