using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.AppComponent.Queries;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.AppComponent.Commands;

public class AddOrUpdateAppComponentCommand : IRequest<ApiResponse<AppComponentResponse>>
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

public class AddOrUpdateAppComponentHandler : BaseRequestHandler<AddOrUpdateAppComponentCommand, ApiResponse<AppComponentResponse>, Domain.Entities.AppComponent, Guid>
{
    public AddOrUpdateAppComponentHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<AppComponentResponse>> HandleRequest(AddOrUpdateAppComponentCommand request, CancellationToken cancellationToken)
    {
        var appComponent = request.Id != Guid.Empty ? await _repository.GetAsync(request.Id, cancellationToken) : new();
        if (appComponent is null)
        {
            return ApiResponse<AppComponentResponse>.Failure(Errors.DataNotFound($"AppComponent with Id = '{request.Id}'"));
        }

        _mapper.Map(request, appComponent);

        if (request.Id == Guid.Empty)
        {
            await _repository.AddAsync(appComponent, cancellationToken);
        }

        await _uow.SaveAsync(cancellationToken);

        return ApiResponse<AppComponentResponse>.Success(_mapper.Map<AppComponentResponse>(appComponent));
    }
}

