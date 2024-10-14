using AutoMapper;
using MediatR;
using Viva.Seed.Application.Common;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Application.Features.AppComponent.Commands;
public class DeleteAppComponentCommand : IRequest<ApiResponse<bool>>
{
    public List<int> IdList { get; set; }
}

public class DeleteAppComponentHandler : BaseRequestHandler<DeleteAppComponentCommand, ApiResponse<bool>, Viva.Seed.Domain.Entities.defaults.AppComponent, int>
{
    public DeleteAppComponentHandler(IUnitOfWork uow, IMapper mapper) : base(uow, mapper) { }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteAppComponentCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);
        return recordsDeleted > 0 ? ApiResponse<bool>.SuccessResult(true) : ApiResponse<bool>.FailureResult(Constants.DeleteFailedMsg);
    }
}
