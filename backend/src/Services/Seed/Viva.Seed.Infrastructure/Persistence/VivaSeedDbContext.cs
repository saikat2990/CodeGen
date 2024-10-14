using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Viva.Shared.Contracts;
using Viva.Seed.Domain.Entities;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Infrastructure.Persistence;

public class VivaSeedDbContext : IdentityDbContext<ApplicationUser, Role, int>
{
    public VivaSeedDbContext(DbContextOptions<VivaSeedDbContext> options) : base(options)
    {
    }

    public DbSet<Domain.Entities.Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Right> Rights { get; set; }
    public DbSet<AppComponent> AppComponents { get; set; }
    public DbSet<AppMenu> AppMenus { get; set; }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<EntityAuditable>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedDate = DateTime.UtcNow;
                    entry.Entity.CreatedBy = "System";
                    break;
                case EntityState.Modified:
                    entry.Entity.LastModifiedDate = DateTime.UtcNow;
                    entry.Entity.ModifiedBy = "System";
                    break;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(InfraConstants.SeedSchema);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(VivaSeedDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }
}
