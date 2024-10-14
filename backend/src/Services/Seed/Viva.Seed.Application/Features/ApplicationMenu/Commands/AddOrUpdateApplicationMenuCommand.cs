using AutoMapper;
using MediatR;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Features.ApplicationMenu.Queries;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;

namespace Viva.Seed.Application.Features.ApplicationMenu.Commands;
public class AddOrUpdateApplicationMenuCommand : IRequest<ApiResponse<AppMenuResponse>>
{
    public int Id { get; set; }
    public int ModuleId { get; set; }
    public string Name { get; set; }
    public string TemplateName { get; set; }
    public string ServiceName { get; set; }
    public string EntryFunc { get; set; }
    public string PageType { get; set; }
    public string PageLayout { get; set; }
    public bool IsActive { get; set; } = true;
}

public class AddOrUpdateApplicationMenuHandler : BaseRequestHandler<AddOrUpdateApplicationMenuCommand, ApiResponse<AppMenuResponse>, AppMenu, int>
{
    public AddOrUpdateApplicationMenuHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<AppMenuResponse>> HandleRequest(AddOrUpdateApplicationMenuCommand request, CancellationToken cancellationToken)
    {
        var applicationMenu = request.Id != 0 ? await _repository.GetAsync(request.Id, cancellationToken) : new();
        if (applicationMenu is null)
        {
            return ApiResponse<AppMenuResponse>.FailureResult(Errors.DataNotFound($"ApplicationMenu with Id = '{request.Id}'"));
        }

        _mapper.Map(request, applicationMenu);

        if (request.Id == 0)
        {
            await _repository.AddAsync(applicationMenu, cancellationToken);
        }

        await _uow.SaveAsync(cancellationToken);

        return ApiResponse<AppMenuResponse>.SuccessResult(_mapper.Map<AppMenuResponse>(applicationMenu));
    }
}
