using AutoMapper;
using MediatR;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Application.Features.AppComponent.Queries;
public class GetAppComponentByIdQuery : IRequest<ApiResponse<AppComponentResponse>>
{
    public int Id { get; set; }
}

public class GetAppComponentByIdQueryHandler : BaseRequestHandler<GetAppComponentByIdQuery, ApiResponse<AppComponentResponse>, Viva.Seed.Domain.Entities.defaults.AppComponent, int>
{
    public GetAppComponentByIdQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper) { }

    public override async Task<ApiResponse<AppComponentResponse>> HandleRequest(GetAppComponentByIdQuery request, CancellationToken ctn)
    {
        var AppComponentResponse = await _repository.GetAsync(request.Id, ctn);
        if (AppComponentResponse is null)
        {
            return ApiResponse<AppComponentResponse>.FailureResult($"AppComponent not found with id = '{request.Id}'");
        }

        return ApiResponse<AppComponentResponse>.SuccessResult(_mapper.Map<AppComponentResponse>(AppComponentResponse));
    }
}
