using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Contracts;
using Viva.Shared.Helpers;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Models;

namespace Viva.Seed.Application.Features.AppComponents.Queries;

public class GetAllAppComponentQuery : GridDataFetchRequest, IRequest<ApiResponse<ListViewModel<AppComponentResponse>>>
{
}

public class GetAllAppComponentQueryHandler : BaseRequestHandler<GetAllAppComponentQuery, ApiResponse<ListViewModel<AppComponentResponse>>, AppComponent, int>
{
    public GetAllAppComponentQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ListViewModel<AppComponentResponse>>> HandleRequest(GetAllAppComponentQuery request, CancellationToken ctn)
    {
        var query = _repository.GetAll().Include(c => c.AppMenus);

        var listViewModel = await new GridDataFetchManager(_mapper)
            .GetListViewDataAsync<AppComponent, AppComponentResponse>(query, request, ctn);

        return ApiResponse<ListViewModel<AppComponentResponse>>.SuccessResult(listViewModel);
    }
}
