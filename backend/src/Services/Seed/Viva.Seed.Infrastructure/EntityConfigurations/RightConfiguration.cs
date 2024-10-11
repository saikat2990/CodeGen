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

        builder.HasMany(r => r.AppMenus)
            .WithOne(menu => menu.Right)
            .HasForeignKey(menu => menu.RightId);

        builder.HasMany(right => right.Roles)
            .WithMany(role => role.Rights)
            .UsingEntity<RightRole>(
                rhs => rhs.HasOne(rr => rr.Role).WithMany(r => r.RightRoles).HasForeignKey(rr => rr.RoleId),
                lhs => lhs.HasOne(rr => rr.Right).WithMany(r => r.RightRoles).HasForeignKey(rr => rr.RightId)
            );
    }
}
