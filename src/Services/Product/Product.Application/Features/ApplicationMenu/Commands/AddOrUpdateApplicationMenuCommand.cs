using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.ApplicationMenu.Queries;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.ApplicationMenu.Commands;
public class AddOrUpdateApplicationMenuCommand : IRequest<ApiResponse<ApplicationMenuResponse>>
{
    public Guid Id { get; set; }
    public int ModuleId { get; set; }
    public string Name { get; set; }
    public string TemplateName { get; set; }
    public string ServiceName { get; set; }
    public string EntryFunc { get; set; }
    public string PageType { get; set; }
    public string PageLayout { get; set; }
    public bool IsActive { get; set; } = true;
}

public class AddOrUpdateApplicationMenuHandler : BaseRequestHandler<AddOrUpdateApplicationMenuCommand, ApiResponse<ApplicationMenuResponse>, Domain.Entities.ApplicationMenu, Guid>
{
    public AddOrUpdateApplicationMenuHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ApplicationMenuResponse>> HandleRequest(AddOrUpdateApplicationMenuCommand request, CancellationToken cancellationToken)
    {
        var applicationMenu = request.Id != Guid.Empty ? await _repository.GetAsync(request.Id, cancellationToken) : new();
        if (applicationMenu is null)
        {
            return ApiResponse<ApplicationMenuResponse>.Failure(Errors.DataNotFound($"applicationMenu with Id = '{request.Id}'"));
        }

        _mapper.Map(request, applicationMenu);

        if (request.Id == Guid.Empty)
        {
            await _repository.AddAsync(applicationMenu, cancellationToken);
        }

        await _uow.SaveAsync(cancellationToken);

        return ApiResponse<ApplicationMenuResponse>.Success(_mapper.Map<ApplicationMenuResponse>(applicationMenu));
    }
}
