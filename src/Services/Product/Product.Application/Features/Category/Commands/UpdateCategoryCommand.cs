using AutoMapper;
using Contracts.ResponseModels;
using MediatR;
using Product.Application.Common;
using Product.Application.Features.Category.Queries;
using Product.Application.Interfaces;

namespace Product.Application.Features.Category.Commands;

public class UpdateCategoryCommand : IRequest<ApiResponse<CategoryResponse>>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

public class UpdateCategoryCommandHandler : RequestHandler<UpdateCategoryCommand, ApiResponse<CategoryResponse>>
{
    public UpdateCategoryCommandHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper){}

    public override async Task<ApiResponse<CategoryResponse>> HandleRequest(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var repo = _uow.GetRepository<Domain.Entities.Category, int>();
        var category = await repo.GetAsync(request.Id);
        _mapper.Map(request, category);

        await _uow.SaveAsync();
        return ApiResponse<CategoryResponse>.Success(_mapper.Map<CategoryResponse>(category));
    }
}
