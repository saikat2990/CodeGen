using AutoMapper;
using Viva.Seed.Application.Features.Auth.Commands;
using Viva.Seed.Application.Features.Categories.Commands;
using Viva.Seed.Application.Features.Categories.Queries;
using Viva.Seed.Domain.Entities;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Application.MappingProfiles;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<Category, CategoryModel>();
            //.ForMember(d => d.Products, opt => opt.MapFrom(s => s.Products));

        CreateMap<AddOrUpdateCategoryCommand, Category>();
    }
}

public class AuthMappingProfile : Profile
{
    public AuthMappingProfile()
    {
        CreateMap<ApplicationUser, LoginResponse>();
    }
}
