using AutoMapper;
using MediatR;
using Product.Application.Interfaces;
using Shared.Contracts;
using Shared.Infrastructures.RequestHandlers;

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
        await _uow.SaveAsync(ctn);

        return ApiResponse<bool>.Success(true);
    }
}
