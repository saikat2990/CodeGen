using AutoMapper;
using Product.Application.Features.Category.Commands;
using Product.Application.Features.Category.Queries;
using Product.Domain.Entities;

namespace Product.Application.MappingProfiles;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<CreateCategoryCommand, Category>();
        CreateMap<Category, CategoryResponse>();

        CreateMap<UpdateCategoryCommand, Category>().ForMember(x => x.Id, x => x.Ignore());
    }
}
