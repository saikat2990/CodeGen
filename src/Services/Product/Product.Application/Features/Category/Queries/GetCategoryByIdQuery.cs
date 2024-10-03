using AutoMapper;
using Contracts.ResponseModels;
using Infrastructure.RequestHandlers;
using MediatR;
using Product.Application.Interfaces;

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

        return ApiResponse<CategoryResponse>.Success(_mapper.Map<CategoryResponse>(categoryResponse));
    }
}
