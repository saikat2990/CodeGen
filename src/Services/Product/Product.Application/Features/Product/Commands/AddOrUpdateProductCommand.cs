using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.Product.Queries;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Product.Commands;

public class AddOrUpdateProductCommand : IRequest<ApiResponse<ProductResponse>>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string ImageUrl { get; set; }
    public int CategoryId { get; set; }
}

public class AddOrUpdateProductCommandHandler : BaseRequestHandler<AddOrUpdateProductCommand, ApiResponse<ProductResponse>, Domain.Entities.Product, int>
{
    public AddOrUpdateProductCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ProductResponse>> HandleRequest(AddOrUpdateProductCommand request, CancellationToken ctn)
    {
        var product = request.Id > 0 ? await _repository.GetAsync(request.Id, ctn) : new();
        if (product is null)
        {
            return ApiResponse<ProductResponse>.Failure(Errors.DataNotFound($"Product with id = '{request.Id}'"));
        }

        _mapper.Map(request, product);

        if (request.Id == 0)
        {
            await _repository.AddAsync(product, ctn);
        }

        await _uow.SaveAsync(ctn);

        return ApiResponse<ProductResponse>.Success(_mapper.Map<ProductResponse>(product), Constants.CreateSuccessMsg);
    }
}
