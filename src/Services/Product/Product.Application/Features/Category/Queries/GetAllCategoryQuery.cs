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

namespace Product.Application.Features.Category.Queries;

public class GetAllCategoryQuery : IRequest<ApiResponse<IEnumerable<CategoryResponse>>>
{
}

public class GetAllCategoryQueryHandler : IRequestHandler<GetAllCategoryQuery, ApiResponse<IEnumerable<CategoryResponse>>>
{
    private readonly IProductUnitOfWork _uow;
    private readonly IMapper _mapper;

    public GetAllCategoryQueryHandler(IProductUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<ApiResponse<IEnumerable<CategoryResponse>>> Handle(GetAllCategoryQuery request, CancellationToken cancellationToken)
    {
        var categories = await _uow.GetRepository<Domain.Entities.Category, int>()
            .Query()
            .ProjectTo<CategoryResponse>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return ApiResponse<IEnumerable<CategoryResponse>>.Success(categories);
    }
}
