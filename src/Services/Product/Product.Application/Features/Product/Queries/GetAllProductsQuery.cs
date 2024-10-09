using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;
using Shared.Models;
using Shared.Services;
namespace Product.Application.Features.Product.Queries;

public class GetAllProductsQuery : GridRequestQuery, IRequest<ApiResponse<ListViewModel<ProductResponse>>>
{
}

public class GetAllProductsQueryHandler : BaseRequestHandler<GetAllProductsQuery, ApiResponse<ListViewModel<ProductResponse>>, Domain.Entities.Product, int>
{
    public GetAllProductsQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ListViewModel<ProductResponse>>> HandleRequest(GetAllProductsQuery request, CancellationToken ctn)
    {
        var query = _repository.GetAll().Include(x => x.Category);

        var listViewModel = await new GridRequestQueryManager(_mapper)
            .GetListViewDataAsync<Domain.Entities.Product, ProductResponse>(query, request, ctn);

        return ApiResponse<ListViewModel<ProductResponse>>.Success(listViewModel);
    }
}
