using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Viva.Seed.Application.Features.ApplicationMenu.Commands;
using Viva.Seed.Application.Features.ApplicationMenu.Queries;

namespace Viva.Seed.Application.MappingProfiles;
public class ApplicationMenuMappingProfile : Profile
{
    public ApplicationMenuMappingProfile()
    {
        CreateMap<Domain.Entities.defaults.AppMenu, ApplicationMenuResponse>();
        CreateMap<AddOrUpdateApplicationMenuCommand, Domain.Entities.defaults.AppMenu>();
    }
}
