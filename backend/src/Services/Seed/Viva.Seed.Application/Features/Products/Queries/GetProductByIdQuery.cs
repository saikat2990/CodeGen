using AutoMapper;
using MediatR;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;

namespace Viva.Seed.Application.Features.Products.Queries;

public class GetProductByIdQuery : IRequest<ApiResponse<ProductModel>>
{
    public int Id { get; set; }
}

public class GetProductByIdQueryHandler : BaseRequestHandler<GetProductByIdQuery, ApiResponse<ProductModel>, Product, int>
{
    public GetProductByIdQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ProductModel>> HandleRequest(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        if (IsEmpty(request.Id))
        {
            return ApiResponse<ProductModel>.EmptyResult<ProductModel>();
        }

        var product = await _repository.GetAsync(request.Id, cancellationToken);
        if (product is null)
        {
            return ApiResponse<ProductModel>.FailureResult($"Product not found with id = '{request.Id}'");
        }

        return ApiResponse<ProductModel>.SuccessResult(_mapper.Map<ProductModel>(product));
    }
}
