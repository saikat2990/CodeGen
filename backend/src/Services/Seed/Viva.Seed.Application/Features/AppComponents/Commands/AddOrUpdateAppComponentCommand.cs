using AutoMapper;
using MediatR;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Features.AppComponents.Queries;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities.defaults;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Application.Features.AppComponents.Commands;

public class AddOrUpdateAppComponentCommand : IRequest<ApiResponse<AppComponentResponse>>
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

public class AddOrUpdateAppComponentHandler : BaseRequestHandler<AddOrUpdateAppComponentCommand, ApiResponse<AppComponentResponse>, AppComponent, int>
{
    public AddOrUpdateAppComponentHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<AppComponentResponse>> HandleRequest(AddOrUpdateAppComponentCommand request, CancellationToken ctn)
    {
        var appComponent = request.Id != 0 ? await _repository.GetAsync(request.Id, ctn) : new();
        if (appComponent is null)
        {
            return ApiResponse<AppComponentResponse>.FailureResult(Errors.DataNotFound($"AppComponent with Id = '{request.Id}'"));
        }

        _mapper.Map(request, appComponent);

        if (request.Id == 0)
        {
            await _repository.AddAsync(appComponent, ctn);
        }

        await _uow.SaveAsync(ctn);

        return ApiResponse<AppComponentResponse>.SuccessResult(_mapper.Map<AppComponentResponse>(appComponent));
    }
}

