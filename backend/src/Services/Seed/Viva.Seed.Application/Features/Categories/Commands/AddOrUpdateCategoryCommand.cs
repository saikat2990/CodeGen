using AutoMapper;
using MediatR;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Features.Categories.Queries;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Application.Features.Categories.Commands;

public class AddOrUpdateCategoryCommand : CategoryModel, IRequest<ApiResponse<CategoryModel>>
{

}

public class AddOrUpdateCategoryHandler : BaseRequestHandler<AddOrUpdateCategoryCommand, ApiResponse<CategoryModel>, Category, int>
{
    public AddOrUpdateCategoryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<CategoryModel>> HandleRequest(AddOrUpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = request.Id != 0 ? await _repository.GetAsync(request.Id, cancellationToken) : new();
        if (category is null)
        {
            return ApiResponse<CategoryModel>.Failure(Errors.DataNotFound($"Category with Id = '{request.Id}'"));
        }

        _mapper.Map(request, category);

        if (request.Id == 0)
        {
            await _repository.AddAsync(category, cancellationToken);
        }

        await _uow.SaveAsync(cancellationToken);

        return ApiResponse<CategoryModel>.SuccessResult(_mapper.Map<CategoryModel>(category));
    }
}
