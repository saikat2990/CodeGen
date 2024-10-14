﻿using AutoMapper;
using MediatR;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;
using Viva.Shared.Contracts;
using Viva.Seed.Application.Interfaces;

namespace Viva.Seed.Application.Features.ApplicationMenu.Queries;
public class GetAllApplicationMenuQuery : IRequest<ApiResponse<IEnumerable<ApplicationMenuResponse>>>
{
}

public class GetAllApplicationMenusQueryHandler : BaseRequestHandler<GetAllApplicationMenuQuery, ApiResponse<IEnumerable<ApplicationMenuResponse>>, AppMenu, int>
{
    public GetAllApplicationMenusQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<IEnumerable<ApplicationMenuResponse>>> HandleRequest(GetAllApplicationMenuQuery request, CancellationToken ctn)
    {
        var ApplicationMenus = await _repository
            .GetAll()
            .ProjectTo<ApplicationMenuResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(ctn);


        return ApiResponse<IEnumerable<ApplicationMenuResponse>>.SuccessResult(ApplicationMenus);
    }
}
