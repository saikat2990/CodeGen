using AutoMapper;
using MediatR;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;
using Product.Application.Interfaces;
using Product.Application.Features.ApplicationMenu.Queries;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Queries;
public class GetAllApplicationMenuQuery : IRequest<ApiResponse<IEnumerable<ApplicationMenuResponse>>>
{
}

public class GetAllApplicationMenusQueryHandler : BaseRequestHandler<GetAllApplicationMenuQuery, ApiResponse<IEnumerable<ApplicationMenuResponse>>, Product.Domain.Entities.ApplicationMenu, Guid>
{
    public GetAllApplicationMenusQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<IEnumerable<ApplicationMenuResponse>>> HandleRequest(GetAllApplicationMenuQuery request, CancellationToken ctn)
    {
        var ApplicationMenus = await _repository
            .GetAll()
            .ProjectTo<ApplicationMenuResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(ctn);


        return ApiResponse<IEnumerable<ApplicationMenuResponse>>.Success(ApplicationMenus);
    }
}
