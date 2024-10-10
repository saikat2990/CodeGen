using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities;
using Viva.Seed.Infrastructure.Membership;
using Viva.Seed.Infrastructure.Persistence;

namespace Viva.Seed.Infrastructure;

public static class InfrastructureDependencyRegistration
{
    public static IServiceCollection AddInfrastructureDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<VivaSeedDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString(InfraConstants.DatabaseConnectionStringConfigName))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
        });

        services.AddMembership();

        services.AddScoped<IVivaSeedUnitOfWork, VivaSeedUnitOfWork>();

        return services;
    }

    private static IServiceCollection AddMembership(this IServiceCollection services)
    {
        services.AddIdentity<ApplicationUser, Role>(action =>
        {
            action.Password.RequireNonAlphanumeric = false;
            action.Password.RequiredLength = 5;
            action.Password.RequireDigit = false;
            action.Password.RequireLowercase = false;
            action.Password.RequireUppercase = false;

            action.User.RequireUniqueEmail = true;
        })
            .AddRoles<Role>()
            .AddEntityFrameworkStores<VivaSeedDbContext>()
            .AddDefaultTokenProviders();

        services.AddHttpContextAccessor();
        services.AddScoped<IAccountService, AccountService>();

        return services;
    }
}
