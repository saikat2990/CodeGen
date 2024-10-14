using AutoMapper;
using MediatR;
using Product.Application.Features.ApplicationMenu.Queries;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;
using Viva.Shared.Contracts;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Queries;
public class GetAllApplicationMenuQuery : IRequest<ApiResponse<IEnumerable<ApplicationMenuResponse>>>
{
}

public class GetAllApplicationMenusQueryHandler : BaseRequestHandler<GetAllApplicationMenuQuery, ApiResponse<IEnumerable<ApplicationMenuResponse>>, AppMenu, int>
{
    public GetAllApplicationMenusQueryHandler(IUnitOfWork uow, IMapper mapper) : base(uow, mapper)
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
