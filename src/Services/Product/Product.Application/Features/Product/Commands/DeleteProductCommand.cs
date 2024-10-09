using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Product.Commands;

public class DeleteProductCommand : IRequest<ApiResponse<bool>>
{
    public List<int> IdList { get; set; }
}

public class DeleteProductCommandHandler : BaseRequestHandler<DeleteProductCommand, ApiResponse<bool>, Domain.Entities.Product, int>
{
    public DeleteProductCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteProductCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);
        
        return recordsDeleted > 0 ? ApiResponse<bool>.Success(true) : ApiResponse<bool>.Failure(Constants.DeleteFailedMsg);
    }
}
