using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        builder.Property(m => m.TypeId).HasConversion<string>();
    }
}
