using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Infrastructure.EntityConfigurations;

public class AppComponentConfiguration : IEntityTypeConfiguration<AppComponent>
{
    public void Configure(EntityTypeBuilder<AppComponent> builder)
    {
        builder.ToTable(nameof(AppComponent));

        builder.HasKey(c => c.Id);

        builder.HasMany(c => c.AppMenus)
            .WithOne(m => m.AppComponent)
            .HasForeignKey(m => m.AppComponentId);
    }
}
