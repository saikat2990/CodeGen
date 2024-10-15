using AutoMapper;
using Viva.Seed.Application.Features.ApplicationMenu.Commands;
using Viva.Seed.Application.Features.ApplicationMenu.Queries;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Application.MappingProfiles;

public class ApplicationMenuMappingProfile : Profile
{
    public ApplicationMenuMappingProfile()
    {
        CreateMap<AppMenu, AppMenuResponse>();
        CreateMap<AddOrUpdateApplicationMenuCommand, AppMenu>();
    }
}
