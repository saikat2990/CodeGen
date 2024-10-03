using AutoMapper;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.Product.Queries;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

namespace Product.Application.Features.Product.Commands;

public class UpdateProductCommand : ProductModel, IRequest<ApiResponse<ProductResponse>>
{
    public int Id { get; set; }
}

public class UpdateProductCommandHandler : BaseRequestHandler<UpdateProductCommand, ApiResponse<ProductResponse>, Domain.Entities.Product, int>
{
    public UpdateProductCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<ProductResponse>> HandleRequest(UpdateProductCommand request, CancellationToken ctn)
    {
        var productToUpdate = await _repository.GetAsync(request.Id, ctn);
        _mapper.Map(request, productToUpdate);

        await _uow.SaveAsync(ctn);
        return ApiResponse<ProductResponse>.Success(_mapper.Map<ProductResponse>(productToUpdate), Constants.UpdateSuccessMsg);
    }
}
