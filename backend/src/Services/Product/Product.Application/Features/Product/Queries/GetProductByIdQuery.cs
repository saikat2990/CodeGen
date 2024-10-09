﻿using AutoMapper;
using MediatR;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Product.Queries;

public class GetProductByIdQuery : IRequest<ApiResponse<ProductResponse>>
{
    public int Id { get; set; }
}

public class GetProductByIdQueryHandler : BaseRequestHandler<GetProductByIdQuery, ApiResponse<ProductResponse>, Domain.Entities.Product, int>
{
    public GetProductByIdQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ProductResponse>> HandleRequest(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _repository.GetAsync(request.Id, cancellationToken);

        return ApiResponse<ProductResponse>.Success(_mapper.Map<ProductResponse>(product));
    }
}