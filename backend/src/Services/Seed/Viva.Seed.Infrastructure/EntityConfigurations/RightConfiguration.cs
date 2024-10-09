using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Infrastructure.EntityConfigurations;

public class RightConfiguration : IEntityTypeConfiguration<Right>
{
    public void Configure(EntityTypeBuilder<Right> builder)
    {
        builder.ToTable(nameof(Right));

        builder.HasKey(x => x.Id);
    }
}
