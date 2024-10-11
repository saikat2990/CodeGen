using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Viva.Shared.Models;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Helpers;

namespace Viva.Seed.Application.Features.Categories.Queries;

public class GetAllCategoryQuery : GridDataFetchRequest, IRequest<ApiResponse<ListViewModel<CategoryModel>>>
{
}

public class GetAllCategoryQueryHandler : BaseRequestHandler<GetAllCategoryQuery, ApiResponse<ListViewModel<CategoryModel>>, Category, int>
{
    public GetAllCategoryQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ListViewModel<CategoryModel>>> HandleRequest(GetAllCategoryQuery request, CancellationToken ctn)
    {
        var query = _repository.GetAll().Include(c => c.Products);

        var listViewModel = await new GridDataFetchManager(_mapper)
            .GetListViewDataAsync<Category, CategoryModel>(query, request, ctn);

        return ApiResponse<ListViewModel<CategoryModel>>.SuccessResult(listViewModel);
    }
}
