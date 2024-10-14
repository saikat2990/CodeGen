using AutoMapper;
using MediatR;
using Product.Application.Features.ApplicationMenu.Queries;
using Viva.Seed.Application.Common;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Application.Features.ApplicationMenu.Commands;
public class AddOrUpdateApplicationMenuCommand : IRequest<ApiResponse<ApplicationMenuResponse>>
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

public class AddOrUpdateApplicationMenuHandler : BaseRequestHandler<AddOrUpdateApplicationMenuCommand, ApiResponse<ApplicationMenuResponse>, Viva.Seed.Domain.Entities.defaults.AppMenu, int>
{
    public AddOrUpdateApplicationMenuHandler(IUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ApplicationMenuResponse>> HandleRequest(AddOrUpdateApplicationMenuCommand request, CancellationToken cancellationToken)
    {
        var applicationMenu = request.Id != 0 ? await _repository.GetAsync(request.Id, cancellationToken) : new();
        if (applicationMenu is null)
        {
            return ApiResponse<ApplicationMenuResponse>.FailureResult(Errors.DataNotFound($"ApplicationMenu with Id = '{request.Id}'"));
        }

        _mapper.Map(request, applicationMenu);

        if (request.Id == 0)
        {
            await _repository.AddAsync(applicationMenu, cancellationToken);
        }

        await _uow.SaveAsync(cancellationToken);

        return ApiResponse<ApplicationMenuResponse>.SuccessResult(_mapper.Map<ApplicationMenuResponse>(applicationMenu));
    }
}
