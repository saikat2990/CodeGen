using Microsoft.EntityFrameworkCore;
using Viva.Seed.Infrastructure.Persistence;

namespace Viva.Seed.Api.Extensions;

public static class HelperExtensions
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();

        var dbContext = serviceScope.ServiceProvider.GetRequiredService<VivaSeedDbContext>();

        if (dbContext.Database.GetPendingMigrations().Any())
        {
            dbContext.Database.Migrate();
        }
    }
}
