using AutoMapper;
using MediatR;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Infrastructures.UnitOfWorks;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Seed.Application.Interfaces;

namespace Viva.Seed.Application.Features.ApplicationMenu.Queries;
public class GetApplicationMenuByIdQuery : IRequest<ApiResponse<AppMenuResponse>>
{
    public int Id { get; set; }
}

public class GetApplicationMenuByIdQueryHandler : BaseRequestHandler<GetApplicationMenuByIdQuery, ApiResponse<AppMenuResponse>, AppMenu, int>
{
    public GetApplicationMenuByIdQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<AppMenuResponse>> HandleRequest(GetApplicationMenuByIdQuery request, CancellationToken ctn)
    {
        var ApplicationMenu = await _repository.GetAsync(request.Id, ctn);

        return ApiResponse<AppMenuResponse>.SuccessResult(_mapper.Map<AppMenuResponse>(ApplicationMenu));
    }
}
