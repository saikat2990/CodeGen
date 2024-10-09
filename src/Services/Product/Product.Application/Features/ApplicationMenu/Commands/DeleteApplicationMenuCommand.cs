using AutoMapper;
using MediatR;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;
using Product.Application.Interfaces;
using Product.Application.Common;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Commands;
public class DeleteApplicationMenuCommand : IRequest<ApiResponse<bool>>
{
    public List<Guid> IdList { get; set; }
}

public class DeleteApplicationMenuCommandHandler : BaseRequestHandler<DeleteApplicationMenuCommand, ApiResponse<bool>, Product.Domain.Entities.ApplicationMenu, Guid>
{
    public DeleteApplicationMenuCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteApplicationMenuCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);

        return recordsDeleted > 0 ? ApiResponse<bool>.Success(true) : ApiResponse<bool>.Failure(Constants.DeleteFailedMsg);
    }
}
