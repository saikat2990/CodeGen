﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Shared.Models;
using Viva.Shared.Services;

namespace Viva.Seed.Application.Features.Products.Queries;

public class GetAllProductsQuery : GridRequestQuery, IRequest<ApiResponse<ListViewModel<ProductModel>>>
{
}

public class GetAllProductsQueryHandler : BaseRequestHandler<GetAllProductsQuery, ApiResponse<ListViewModel<ProductModel>>, Domain.Entities.Product, int>
{
    public GetAllProductsQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ListViewModel<ProductModel>>> HandleRequest(GetAllProductsQuery request, CancellationToken ctn)
    {
        var query = _repository.GetAll().Include(x => x.Category);

        var listViewModel = await new GridRequestQueryManager(_mapper)
            .GetListViewDataAsync<Domain.Entities.Product, ProductModel>(query, request, ctn);

        return ApiResponse<ListViewModel<ProductModel>>.SuccessResult(listViewModel);
    }
}
