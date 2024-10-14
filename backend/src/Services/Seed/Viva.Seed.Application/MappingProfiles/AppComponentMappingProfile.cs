using AutoMapper;
using Viva.Seed.Application.Features.AppComponents.Commands;
using Viva.Seed.Application.Features.AppComponents.Queries;
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
