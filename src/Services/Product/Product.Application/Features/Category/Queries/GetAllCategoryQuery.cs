using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;
using Shared.Models;
using Shared.Services;

namespace Product.Application.Features.Category.Queries;

public class GetAllCategoryQuery : GridRequestQuery, IRequest<ApiResponse<ListViewModel<CategoryResponse>>>
{
}

public class GetAllCategoryQueryHandler : BaseRequestHandler<GetAllCategoryQuery, ApiResponse<ListViewModel<CategoryResponse>>, Domain.Entities.Category, int>
{
    public GetAllCategoryQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ListViewModel<CategoryResponse>>> HandleRequest(GetAllCategoryQuery request, CancellationToken ctn)
    {
        var query = _repository.GetAll().Include(c => c.Products);

        var listViewModel = await new GridRequestQueryManager(_mapper)
            .GetListViewDataAsync<Domain.Entities.Category, CategoryResponse>(query, request, ctn);

        return ApiResponse<ListViewModel<CategoryResponse>>.Success(listViewModel);
    }
}
