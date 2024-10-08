using AutoMapper;
using Product.Application.Features.Category.Commands;
using Product.Application.Features.Category.Queries;
using Product.Domain.Entities;

namespace Product.Application.MappingProfiles;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<Category, CategoryResponse>();
        CreateMap<AddOrUpdateCategoryCommand, Category>();
    }
}
