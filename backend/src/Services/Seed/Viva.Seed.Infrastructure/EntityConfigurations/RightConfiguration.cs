using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Infrastructure.EntityConfigurations;

public class RightConfiguration : IEntityTypeConfiguration<Right>
{
    public void Configure(EntityTypeBuilder<Right> builder)
    {
        builder.ToTable(nameof(Right));

        builder.HasKey(r => r.Id);

        builder.HasMany(r => r.Roles)
            .WithMany(role => role.Rights);

        builder.HasMany(r => r.AppMenus)
            .WithOne(menu => menu.Right)
            .HasForeignKey(menu => menu.RightId);
    }
}
