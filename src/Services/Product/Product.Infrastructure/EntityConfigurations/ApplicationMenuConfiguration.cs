using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Product.Domain.Entities;

namespace Product.Infrastructure.EntityConfigurations;
public class ApplicationMenuConfiguration : IEntityTypeConfiguration<Domain.Entities.ApplicationMenu>
{
    public void Configure(EntityTypeBuilder<Domain.Entities.ApplicationMenu> builder)
    {
        builder.ToTable("ApplicationMenus");

        builder.HasKey(m => m.Id);

        builder.HasOne(m => m.AppComponent)
            .WithMany(a => a.ApplicationMenus)
            .HasForeignKey(m => m.AppComponentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
