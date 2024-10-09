using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.AppComponent.Commands;
public class DeleteAppComponentCommand : IRequest<ApiResponse<bool>>
{
    public List<Guid> IdList { get; set; }
}

public class DeleteAppComponentHandler : BaseRequestHandler<DeleteAppComponentCommand, ApiResponse<bool>, Domain.Entities.AppComponent, Guid>
{
    public DeleteAppComponentHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper) { }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteAppComponentCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);
        return recordsDeleted > 0 ? ApiResponse<bool>.Success(true) : ApiResponse<bool>.Failure(Constants.DeleteFailedMsg);
    }
}
