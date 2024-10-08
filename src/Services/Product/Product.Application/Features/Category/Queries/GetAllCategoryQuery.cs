using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Category.Queries;

public class GetAllCategoryQuery : IRequest<ApiResponse<IEnumerable<CategoryResponse>>>
{
}

public class GetAllCategoryQueryHandler : BaseRequestHandler<GetAllCategoryQuery, ApiResponse<IEnumerable<CategoryResponse>>, Domain.Entities.Category, int>
{
    public GetAllCategoryQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<IEnumerable<CategoryResponse>>> HandleRequest(GetAllCategoryQuery request, CancellationToken ctn)
    {
        var categories = await _repository
            .GetAll()
            .Include(c => c.Products)
            .ProjectTo<CategoryResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(ctn);

        return ApiResponse<IEnumerable<CategoryResponse>>.Success(categories);
    }
}
