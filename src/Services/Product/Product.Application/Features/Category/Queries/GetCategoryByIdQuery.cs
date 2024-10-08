using AutoMapper;
using MediatR;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Category.Queries;

public class GetCategoryByIdQuery : IRequest<ApiResponse<CategoryResponse>>
{
    public int Id { get; set; }
}

public class GetCategoryByIdQueryHandler : BaseRequestHandler<GetCategoryByIdQuery, ApiResponse<CategoryResponse>, Domain.Entities.Category, int>
{
    public GetCategoryByIdQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper) {}

    public override async Task<ApiResponse<CategoryResponse>> HandleRequest(GetCategoryByIdQuery request, CancellationToken ctn)
    {
        var categoryResponse = await _repository.GetAsync(request.Id, ctn);
        if (categoryResponse is null)
        {
            return ApiResponse<CategoryResponse>.Failure($"Category not found with id = '{request.Id}'");
        }

        return ApiResponse<CategoryResponse>.Success(_mapper.Map<CategoryResponse>(categoryResponse));
    }
}
