using AutoMapper;
using MediatR;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Seed.Application.Features.Products.Queries;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Application.Features.Products.Commands;

public class AddOrUpdateProductCommand : IRequest<ApiResponse<int>>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string ImageUrl { get; set; }
    public int CategoryId { get; set; }
}

public class AddOrUpdateProductCommandHandler : BaseRequestHandler<AddOrUpdateProductCommand, ApiResponse<int>, Product, int>
{
    public AddOrUpdateProductCommandHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<int>> HandleRequest(AddOrUpdateProductCommand request, CancellationToken ctn)
    {
        var product = request.Id > 0 ? await _repository.GetAsync(request.Id, ctn) : new();
        if (product is null)
        {
            return ApiResponse<int>.FailureResult(Errors.DataNotFound($"Product with id = '{request.Id}'"));
        }

        _mapper.Map(request, product);

        if (request.Id == 0)
        {
            await _repository.AddAsync(product, ctn);
        }

        await _uow.SaveAsync(ctn);

        return ApiResponse<int>.SuccessResult(product.Id, request.Id == 0 ? Constants.CreateSuccessMsg : Constants.UpdateSuccessMsg);
    }
}
