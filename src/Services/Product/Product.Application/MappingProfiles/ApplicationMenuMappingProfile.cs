using AutoMapper;
using Product.Application.Features.ApplicationMenu.Commands;
using Product.Application.Features.ApplicationMenu.Queries;


namespace Product.Application.MappingProfiles;
public class ApplicationMenuMappingProfile : Profile
{
    public ApplicationMenuMappingProfile()
    {
        CreateMap<Domain.Entities.ApplicationMenu, ApplicationMenuResponse>();
        CreateMap<AddOrUpdateApplicationMenuCommand, Domain.Entities.ApplicationMenu>();
    }
}
