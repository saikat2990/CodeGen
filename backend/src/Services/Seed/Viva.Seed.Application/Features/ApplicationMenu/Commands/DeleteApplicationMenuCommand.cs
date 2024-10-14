using AutoMapper;
using MediatR;
using Viva.Shared.Infrastructures.UnitOfWorks;
using Viva.Shared.Contracts;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Seed.Application.Common;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Commands;
public class DeleteApplicationMenuCommand : IRequest<ApiResponse<bool>>
{
    public List<int> IdList { get; set; }
}

public class DeleteApplicationMenuCommandHandler : BaseRequestHandler<DeleteApplicationMenuCommand, ApiResponse<bool>, AppMenu, int>
{
    public DeleteApplicationMenuCommandHandler(IUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteApplicationMenuCommand request, CancellationToken ctn)
    {
        var recordsDeleted = await _repository.BulkDeleteAsync(request.IdList, ctn);

        return recordsDeleted > 0 ? ApiResponse<bool>.SuccessResult(true) : ApiResponse<bool>.FailureResult(Constants.DeleteFailedMsg);
    }
}
