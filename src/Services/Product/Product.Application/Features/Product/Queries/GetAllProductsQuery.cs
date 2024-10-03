using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;
namespace Product.Application.Features.Product.Queries;

public class GetAllProductsQuery : IRequest<ApiResponse<IEnumerable<ProductResponse>>>
{
}

public class GetAllProductsQueryHandler : BaseRequestHandler<GetAllProductsQuery, ApiResponse<IEnumerable<ProductResponse>>, Domain.Entities.Product, int>
{
    public GetAllProductsQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<IEnumerable<ProductResponse>>> HandleRequest(GetAllProductsQuery request, CancellationToken ctn)
    {
        var products = await _repository
            .GetAll()
            .ProjectTo<ProductResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(ctn);

        return ApiResponse<IEnumerable<ProductResponse>>.Success(products);
    }
}
