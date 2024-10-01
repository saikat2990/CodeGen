using AutoMapper;
using Contracts.ResponseModels;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.Product.Queries;
using Product.Application.Interfaces;

namespace Product.Application.Features.Product.Commands;

public class CreateProductCommand : IRequest<ApiResponse<int>>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string ImageUrl { get; set; }
    public int CategoryId { get; set; }
}

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ApiResponse<int>>
{
    private readonly IProductUnitOfWork _uow;
    private readonly IMapper _mapper;

    public CreateProductCommandHandler(IProductUnitOfWork productUnitOfWork, IMapper mapper)
    {
        _uow = productUnitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<int>> Handle(CreateProductCommand request, CancellationToken ctn)
    {
        var product = _mapper.Map<Domain.Entities.Product>(request);
        await _uow.GetRepository<Domain.Entities.Product, int>().AddAsync(product, ctn);
        await _uow.SaveAsync();

        return ApiResponse<int>.Success(product.Id, Constants.CreateSuccessMsg);
    }

}