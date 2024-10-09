using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Product.Domain.Entities;

namespace Product.Infrastructure.EntityConfigurations;
public class AppComponentConfiguration : IEntityTypeConfiguration<AppComponent>
{
    public void Configure(EntityTypeBuilder<AppComponent> builder)
    {
        builder.ToTable("AppComponents");

        builder.HasKey(a => a.Id);

        builder.HasMany(a => a.ApplicationMenus)
            .WithOne(m => m.AppComponent)
            .HasForeignKey(m => m.AppComponentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
