using AutoMapper;
using Contracts.ResponseModels;
using Infrastructure.RequestHandlers;
using MediatR;
using Product.Application.Common;
using Product.Application.Interfaces;

namespace Product.Application.Features.Product.Commands;

public class CreateProductCommand : ProductModel, IRequest<ApiResponse<int>>
{
}

public class CreateProductCommandHandler : BaseRequestHandler<CreateProductCommand, ApiResponse<int>, Domain.Entities.Product, int>
{
    public CreateProductCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<int>> HandleRequest(CreateProductCommand request, CancellationToken ctn)
    {
        var newProduct = _mapper.Map<Domain.Entities.Product>(request);
        await _repository.AddAsync(newProduct, ctn);
        await _uow.SaveAsync();

        return ApiResponse<int>.Success(newProduct.Id, Constants.CreateSuccessMsg);
    }
}
