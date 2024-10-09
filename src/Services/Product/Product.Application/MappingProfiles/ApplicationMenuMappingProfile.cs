using AutoMapper;
using Product.Application.Features.ApplicationMenu.Commands;
using Product.Application.Features.ApplicationMenu.Queries;
using Product.Domain.Entities;

namespace Product.Application.MappingProfiles;
public class ApplicationMenuMappingProfile : Profile
{
    public ApplicationMenuMappingProfile()
    {
        CreateMap<ApplicationMenu, ApplicationMenuResponse>();
        CreateMap<AddOrUpdateApplicationMenuCommand, ApplicationMenu>();
    }
}
