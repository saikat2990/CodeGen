using AutoMapper;
using MediatR;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;
using Product.Application.Features.ApplicationMenu.Queries;
using Product.Application.Interfaces;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Queries;
public class GetApplicationMenuByIdQuery : IRequest<ApiResponse<ApplicationMenuResponse>>
{
    public Guid Id { get; set; }
}

public class GetApplicationMenuByIdQueryHandler : BaseRequestHandler<GetApplicationMenuByIdQuery, ApiResponse<ApplicationMenuResponse>, Product.Domain.Entities.ApplicationMenu, Guid>
{
    public GetApplicationMenuByIdQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ApplicationMenuResponse>> HandleRequest(GetApplicationMenuByIdQuery request, CancellationToken cancellationToken)
    {
        var ApplicationMenu = await _repository.GetAsync(request.Id, cancellationToken);

        return ApiResponse<ApplicationMenuResponse>.Success(_mapper.Map<ApplicationMenuResponse>(ApplicationMenu));
    }
}
