using AutoMapper;
using Contracts.ResponseModels;
using Infrastructure.RequestHandlers;
using MediatR;
using Product.Application.Interfaces;

namespace Product.Application.Features.Product.Commands;

public class DeleteProductCommand : IRequest<ApiResponse<bool>>
{
    public int Id { get; set; }
}

public class DeleteProductCommandHandler : BaseRequestHandler<DeleteProductCommand, ApiResponse<bool>, Domain.Entities.Product, int>
{
    public DeleteProductCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteProductCommand request, CancellationToken ctn)
    {
        var product = await _repository.GetAsync(request.Id, ctn);
        _repository.Delete(product);

        await _uow.SaveAsync(ctn);
        return ApiResponse<bool>.Success(true);
    }
}
