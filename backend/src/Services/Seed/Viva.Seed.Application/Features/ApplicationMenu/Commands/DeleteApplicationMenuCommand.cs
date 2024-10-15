using AutoMapper;
using MediatR;
using Viva.Shared.Contracts;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;

namespace Viva.Seed.Application.Features.ApplicationMenu.Commands;
public class DeleteApplicationMenuCommand : IRequest<ApiResponse<bool>>
{
    public List<int> IdList { get; set; }
}

public class DeleteApplicationMenuCommandHandler : BaseRequestHandler<DeleteApplicationMenuCommand, ApiResponse<bool>, AppMenu, int>
{
    public DeleteApplicationMenuCommandHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteApplicationMenuCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);

        return recordsDeleted > 0 ? ApiResponse<bool>.SuccessResult(true) : ApiResponse<bool>.FailureResult(Constants.DeleteFailedMsg);
    }
}
