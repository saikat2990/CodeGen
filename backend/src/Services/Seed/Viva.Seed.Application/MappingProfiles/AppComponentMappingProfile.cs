using AutoMapper;
using Viva.Seed.Application.Features.AppComponent.Commands;
using Viva.Seed.Application.Features.AppComponent.Queries;
using Viva.Seed.Domain.Entities.defaults;

namespace Viva.Seed.Application.MappingProfiles;
public class AppComponentMappingProfile : Profile
{
    public AppComponentMappingProfile()
    {
        CreateMap<AppComponent, AppComponentResponse>()
            .ForMember(d => d.AppMenus, opt => opt.MapFrom(s => s.AppMenus));

        CreateMap<AddOrUpdateAppComponentCommand, AppComponent>();
    }
}
