using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts.ResponseModels;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Product.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product.Application.Features.Product.Queries;

public class GetAllProductsQuery : IRequest<ApiResponse<IEnumerable<ProductResponse>>>
{
}

public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, ApiResponse<IEnumerable<ProductResponse>>>
{
    private readonly IProductUnitOfWork _uow;
    private readonly IMapper _mapper;

    public GetAllProductsQueryHandler(IProductUnitOfWork productUnitOfWork, IMapper mapper)
    {
        _uow = productUnitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<IEnumerable<ProductResponse>>> Handle(GetAllProductsQuery request, CancellationToken ctn)
    {
        var products = await _uow.GetRepository<Domain.Entities.Product, int>()
            .Query()
            .ProjectTo<ProductResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(ctn);

        return ApiResponse<IEnumerable<ProductResponse>>.Success(products);
    }
}
