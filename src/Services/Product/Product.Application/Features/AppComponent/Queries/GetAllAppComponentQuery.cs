using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.AppComponent.Queries;
public class GetAllAppComponentQuery : IRequest<ApiResponse<IEnumerable<AppComponentResponse>>>
{
}

public class GetAllAppComponentQueryHandler : BaseRequestHandler<GetAllAppComponentQuery, ApiResponse<IEnumerable<AppComponentResponse>>, Domain.Entities.AppComponent, Guid>
{
    public GetAllAppComponentQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<IEnumerable<AppComponentResponse>>> HandleRequest(GetAllAppComponentQuery request, CancellationToken ctn)
    {
        var categories = await _repository
            .GetAll()
            .Include(c => c.ApplicationMenus)
            .ProjectTo<AppComponentResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(ctn);

        return ApiResponse<IEnumerable<AppComponentResponse>>.Success(categories);
    }
}
