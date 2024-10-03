using AutoMapper;
using Contracts.ResponseModels;
using Infrastructure.RequestHandlers;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.Category.Queries;
using Product.Application.Interfaces;

namespace Product.Application.Features.Category.Commands;

public class UpdateCategoryCommand : CategoryModel, IRequest<ApiResponse<CategoryResponse>>
{
    public int Id { get; set; }
}

public class UpdateCategoryCommandHandler : BaseRequestHandler<UpdateCategoryCommand, ApiResponse<CategoryResponse>, Domain.Entities.Category, int>
{
    public UpdateCategoryCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper){}

    public override async Task<ApiResponse<CategoryResponse>> HandleRequest(UpdateCategoryCommand request, CancellationToken ctn)
    {
        var category = await _repository.GetAsync(request.Id, ctn);
        _mapper.Map(request, category);

        await _uow.SaveAsync();
        return ApiResponse<CategoryResponse>.Success(_mapper.Map<CategoryResponse>(category));
    }
}
