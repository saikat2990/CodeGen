using AutoMapper;
using MediatR;
using Product.Application.Features.ApplicationMenu.Queries;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Infrastructures.UnitOfWorks;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Queries;
public class GetApplicationMenuByIdQuery : IRequest<ApiResponse<ApplicationMenuResponse>>
{
    public int Id { get; set; }
}

public class GetApplicationMenuByIdQueryHandler : BaseRequestHandler<GetApplicationMenuByIdQuery, ApiResponse<ApplicationMenuResponse>, AppMenu, int>
{
    public GetApplicationMenuByIdQueryHandler(IUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ApplicationMenuResponse>> HandleRequest(GetApplicationMenuByIdQuery request, CancellationToken cancellationToken)
    {
        var ApplicationMenu = await _repository.GetAsync(request.Id, cancellationToken);

        return ApiResponse<ApplicationMenuResponse>.SuccessResult(_mapper.Map<ApplicationMenuResponse>(ApplicationMenu));
    }
}
