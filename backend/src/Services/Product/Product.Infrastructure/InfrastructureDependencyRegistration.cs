using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Product.Application.Interfaces;
using Product.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product.Infrastructure;

public static class InfrastructureDependencyRegistration
{
    public static IServiceCollection AddInfrastructureDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ProductDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString(Constants.DatabaseConnectionStringConfigName))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
        });

        services.AddScoped<IProductUnitOfWork, ProductUnitOfWork>();

        return services;
    }
}
