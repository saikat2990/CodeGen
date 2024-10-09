using AutoMapper;
using MediatR;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.AppComponent.Queries;
public class GetAppComponentByIdQuery : IRequest<ApiResponse<AppComponentResponse>>
{
    public Guid Id { get; set; }
}

public class GetAppComponentByIdQueryHandler : BaseRequestHandler<GetAppComponentByIdQuery, ApiResponse<AppComponentResponse>, Domain.Entities.AppComponent, Guid>
{
    public GetAppComponentByIdQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper) { }

    public override async Task<ApiResponse<AppComponentResponse>> HandleRequest(GetAppComponentByIdQuery request, CancellationToken ctn)
    {
        var AppComponentResponse = await _repository.GetAsync(request.Id, ctn);
        if (AppComponentResponse is null)
        {
            return ApiResponse<AppComponentResponse>.Failure($"AppComponent not found with id = '{request.Id}'");
        }

        return ApiResponse<AppComponentResponse>.Success(_mapper.Map<AppComponentResponse>(AppComponentResponse));
    }
}
