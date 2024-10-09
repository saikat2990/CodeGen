using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.Category.Queries;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;
using Shared.Infrastructures.UnitOfWorks;

namespace Product.Application.Features.Category.Commands;

public class AddOrUpdateCategoryCommand : IRequest<ApiResponse<CategoryResponse>>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

public class AddOrUpdateCategoryHandler : BaseRequestHandler<AddOrUpdateCategoryCommand, ApiResponse<CategoryResponse>, Domain.Entities.Category, int>
{
    public AddOrUpdateCategoryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<CategoryResponse>> HandleRequest(AddOrUpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = request.Id != 0 ? await _repository.GetAsync(request.Id, cancellationToken) : new();
        if (category is null)
        {
            return ApiResponse<CategoryResponse>.Failure(Errors.DataNotFound($"Category with Id = '{request.Id}'"));
        }

        _mapper.Map(request, category);

        if (request.Id == 0)
        {
            await _repository.AddAsync(category, cancellationToken);
        }

        await _uow.SaveAsync(cancellationToken);

        return ApiResponse<CategoryResponse>.Success(_mapper.Map<CategoryResponse>(category));
    }
}
