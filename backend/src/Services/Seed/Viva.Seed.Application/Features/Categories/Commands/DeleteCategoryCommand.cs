using AutoMapper;
using MediatR;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Seed.Application.Common;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Application.Features.Categories.Commands;

public class DeleteCategoryCommand : IRequest<ApiResponse<bool>>
{
    public List<int> IdList { get; set; }
}

public class DeleteCategoryHandler : BaseRequestHandler<DeleteCategoryCommand, ApiResponse<bool>, Category, int>
{
    public DeleteCategoryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper) { }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteCategoryCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);
        return recordsDeleted > 0 ? ApiResponse<bool>.SuccessResult(true) : ApiResponse<bool>.FailureResult(Constants.DeleteFailedMsg);
    }
}
