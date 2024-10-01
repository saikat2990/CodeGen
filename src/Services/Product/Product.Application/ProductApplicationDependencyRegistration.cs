using Microsoft.Extensions.DependencyInjection;
using Product.Application.MappingProfiles;

namespace Product.Application;

public static class ProductApplicationDependencyRegistration
{
    public static IServiceCollection AddProductApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(ProductApplicationDependencyRegistration).Assembly));

        services.AddAutoMapper(typeof(ProductApplicationDependencyRegistration).Assembly);
        return services;
    }
}
