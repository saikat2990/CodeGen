using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Category.Commands;

public class DeleteCategoryCommand : IRequest<ApiResponse<bool>>
{
    public List<int> IdList { get; set; }
}

public class DeleteCategoryHandler : BaseRequestHandler<DeleteCategoryCommand, ApiResponse<bool>, Domain.Entities.Category, int>
{
    public DeleteCategoryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper){}

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteCategoryCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);
        return recordsDeleted > 0 ? ApiResponse<bool>.Success(true) : ApiResponse<bool>.Failure(Constants.DeleteFailedMsg);
    }
}
