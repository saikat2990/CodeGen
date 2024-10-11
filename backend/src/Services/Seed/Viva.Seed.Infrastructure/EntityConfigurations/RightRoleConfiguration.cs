using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Infrastructure.EntityConfigurations;

public class RightRoleConfiguration : IEntityTypeConfiguration<RightRole>
{
    public void Configure(EntityTypeBuilder<RightRole> builder)
    {
        builder.ToTable(nameof(RightRole));
        builder.HasKey(x => new { x.RightId, x.RoleId });
    }
}
