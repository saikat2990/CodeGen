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
    public GetProductByIdQueryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ProductModel>> HandleRequest(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _repository.GetAsync(request.Id, cancellationToken);

        return ApiResponse<ProductModel>.SuccessResult(_mapper.Map<ProductModel>(product));
    }
}
