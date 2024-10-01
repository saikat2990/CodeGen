using AutoMapper;
using Product.Application.Features.Product.Queries;

namespace Product.Application.MappingProfiles;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<Domain.Entities.Product, ProductResponse>();
       
    }
}
