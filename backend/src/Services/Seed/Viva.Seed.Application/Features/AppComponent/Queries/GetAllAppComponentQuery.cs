using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Application.Features.AppComponent.Queries;
public class GetAllAppComponentQuery : IRequest<ApiResponse<IEnumerable<AppComponentResponse>>>
{
}

public class GetAllAppComponentQueryHandler : BaseRequestHandler<GetAllAppComponentQuery, ApiResponse<IEnumerable<AppComponentResponse>>, Domain.Entities.defaults.AppComponent, int>
{
    public GetAllAppComponentQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<IEnumerable<AppComponentResponse>>> HandleRequest(GetAllAppComponentQuery request, CancellationToken ctn)
    {
        var categories = await _repository
            .GetAll()
            .Include(c => c.AppMenus)
            .ProjectTo<AppComponentResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(ctn);

        return ApiResponse<IEnumerable<AppComponentResponse>>.SuccessResult(categories);
    }
}
