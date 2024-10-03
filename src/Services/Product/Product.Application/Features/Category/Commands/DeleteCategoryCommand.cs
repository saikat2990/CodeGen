using AutoMapper;
using Contracts.ResponseModels;
using Infrastructure.RequestHandlers;
using MediatR;
using Product.Application.Interfaces;

namespace Product.Application.Features.Category.Commands;

public class DeleteCategoryCommand : IRequest<ApiResponse<bool>>
{
    public int Id { get; set; }
}

public class DeleteCategoryHandler : BaseRequestHandler<DeleteCategoryCommand, ApiResponse<bool>, Domain.Entities.Category, int>
{
    public DeleteCategoryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper){}

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteCategoryCommand request, CancellationToken ctn)
    {
        var category = await _repository.GetAsync(request.Id, ctn);
        _repository.Delete(category);
        await _uow.SaveAsync();

        return ApiResponse<bool>.Success(true);
    }
}
