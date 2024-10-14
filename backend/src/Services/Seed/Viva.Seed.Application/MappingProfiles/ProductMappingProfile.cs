using AutoMapper;
using Viva.Seed.Application.Features.Products.Commands;
using Viva.Seed.Application.Features.Products.Queries;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Application.MappingProfiles;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<Domain.Entities.Product, ProductModel>();
            //.ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category.Name));

        CreateMap<AddOrUpdateProductCommand, Domain.Entities.Product>();
    }
}
