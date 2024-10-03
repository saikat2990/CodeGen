using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Category.Commands;

public class CreateCategoryCommand : CategoryModel, IRequest<ApiResponse<int>>
{
}

public class CreateCategoryHandler : BaseRequestHandler<CreateCategoryCommand, ApiResponse<int>, Domain.Entities.Category, int>
{
    public CreateCategoryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<int>> HandleRequest(CreateCategoryCommand request, CancellationToken ctn)
    {
        var category = _mapper.Map<Domain.Entities.Category>(request);

        await _repository.AddAsync(category, ctn);
        await _uow.SaveAsync(ctn);

        return ApiResponse<int>.Success(category.Id);
    }
}
