﻿using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Viva.Shared.Behaviors;

namespace Viva.Seed.Application;

public static class ProductApplicationDependencyRegistration
{
    public static IServiceCollection AddProductApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssemblies(typeof(ProductApplicationDependencyRegistration).Assembly));

        services.AddAutoMapper(typeof(ProductApplicationDependencyRegistration).Assembly);

        services.AddValidatorsFromAssembly(typeof(ProductApplicationDependencyRegistration).Assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(CommandValidationBehavior<,>));

        return services;
    }
}
