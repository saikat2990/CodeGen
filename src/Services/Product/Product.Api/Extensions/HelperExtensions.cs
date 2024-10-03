using Microsoft.EntityFrameworkCore;
using Product.Infrastructure.Persistence;

namespace Product.Api.Extensions;

public static class HelperExtensions
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();

        var dbContext = serviceScope.ServiceProvider.GetRequiredService<ProductDbContext>();

        if (!dbContext.Database.EnsureCreated())
        {
            dbContext.Database.Migrate();
        }
    }
}
