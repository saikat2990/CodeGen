using AutoMapper;
using MediatR;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;

namespace Viva.Seed.Application.Features.Products.Commands;

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
        
        return recordsDeleted > 0 ? ApiResponse<bool>.SuccessResult(true) : ApiResponse<bool>.Failure(Constants.DeleteFailedMsg);
    }
}
