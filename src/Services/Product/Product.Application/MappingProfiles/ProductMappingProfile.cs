using AutoMapper;
using Product.Application.Features.Product.Commands;
using Product.Application.Features.Product.Queries;

namespace Product.Application.MappingProfiles;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<Domain.Entities.Product, ProductResponse>();
        CreateMap<CreateProductCommand, Domain.Entities.Product>();

        CreateMap<UpdateProductCommand, Domain.Entities.Product>().ForMember(x => x.Id, x => x.Ignore());
    }
}
