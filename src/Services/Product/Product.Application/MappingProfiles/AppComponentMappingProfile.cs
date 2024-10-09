using AutoMapper;
using Product.Application.Features.AppComponent.Commands;
using Product.Application.Features.AppComponent.Queries;
using Product.Domain.Entities;

namespace Product.Application.MappingProfiles;
public class AppComponentMappingProfile : Profile
{
    public AppComponentMappingProfile()
    {
        CreateMap<AppComponent, AppComponentResponse>()
            .ForMember(d => d.ApplicationMenus, opt => opt.MapFrom(s => s.ApplicationMenus));

        CreateMap<AddOrUpdateAppComponentCommand, AppComponent>();
    }
}
