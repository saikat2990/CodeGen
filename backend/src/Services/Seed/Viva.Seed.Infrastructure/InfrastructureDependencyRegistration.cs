using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Infrastructure.Persistence;

namespace Viva.Seed.Infrastructure;

public static class InfrastructureDependencyRegistration
{
    public static IServiceCollection AddInfrastructureDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<VivaSeedDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString(Constants.DatabaseConnectionStringConfigName))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
        });

        services.AddScoped<IVivaSeedUnitOfWork, VivaSeedUnitOfWork>();

        return services;
    }
}
