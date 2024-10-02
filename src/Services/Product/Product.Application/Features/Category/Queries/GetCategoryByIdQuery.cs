using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts.ResponseModels;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Product.Application.Interfaces;

namespace Product.Application.Features.Category.Queries;

public class GetCategoryByIdQuery : IRequest<ApiResponse<CategoryResponse>>
{
    public int Id { get; set; }
}

public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, ApiResponse<CategoryResponse>>
{
    private readonly IProductUnitOfWork _uow;
    private readonly IMapper _mapper;

    public GetCategoryByIdQueryHandler(IProductUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<ApiResponse<CategoryResponse>> Handle(GetCategoryByIdQuery request, CancellationToken ctn)
    {
        var categoryResponse = await _uow.GetRepository<Domain.Entities.Category, int>()
            .GetAsync(request.Id);

        return ApiResponse<CategoryResponse>.Success(_mapper.Map<CategoryResponse>(categoryResponse));
    }
}
