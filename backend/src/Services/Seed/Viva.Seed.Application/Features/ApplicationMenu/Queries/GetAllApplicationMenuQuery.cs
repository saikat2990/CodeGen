using AutoMapper;
using MediatR;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;
using Viva.Shared.Contracts;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Models;
using Viva.Shared.Helpers;

namespace Viva.Seed.Application.Features.ApplicationMenu.Queries;
public class GetAllApplicationMenuQuery : GridDataFetchRequest, IRequest<ApiResponse<ListViewModel<AppMenuResponse>>>
{
}

public class GetAllApplicationMenusQueryHandler : BaseRequestHandler<GetAllApplicationMenuQuery, ApiResponse<ListViewModel<AppMenuResponse>>, AppMenu, int>
{
    public GetAllApplicationMenusQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ListViewModel<AppMenuResponse>>> HandleRequest(GetAllApplicationMenuQuery request, CancellationToken ctn)
    {
        var query = _repository.GetAll();

        var listViewModel = await new GridDataFetchManager(_mapper)
            .GetListViewDataAsync<AppMenu, AppMenuResponse>(query, request, ctn);

        return ApiResponse<ListViewModel<AppMenuResponse>>.SuccessResult(listViewModel);
    }
}
