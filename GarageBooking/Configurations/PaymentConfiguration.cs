using GarageBooking.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GarageBooking.Configurations;

public class PaymentConfiguration : IEntityTypeConfiguration<PaymentEventEntity>
{
    public void Configure(EntityTypeBuilder<PaymentEventEntity> b)
    {
        b.HasIndex(p => p.PayDate).IsUnique();
    }
}
