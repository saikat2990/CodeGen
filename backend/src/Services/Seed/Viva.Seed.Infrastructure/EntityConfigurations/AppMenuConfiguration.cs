using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Infrastructure.EntityConfigurations;

public class AppMenuConfiguration : IEntityTypeConfiguration<AppMenu>
{
    public void Configure(EntityTypeBuilder<AppMenu> builder)
    {
        builder.ToTable(nameof(AppMenu));

        builder.HasKey(m => m.Id);

        builder.HasOne(m => m.AppComponent)
            .WithMany(c => c.AppMenus)
            .HasForeignKey(m => m.AppComponentId);

    }
}
