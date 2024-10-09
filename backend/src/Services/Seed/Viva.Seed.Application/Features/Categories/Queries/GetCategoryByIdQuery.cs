using AutoMapper;
using MediatR;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Application.Features.Categories.Queries;

public class GetCategoryByIdQuery : IRequest<ApiResponse<CategoryModel>>
{
    public int Id { get; set; }
}

public class GetCategoryByIdQueryHandler : BaseRequestHandler<GetCategoryByIdQuery, ApiResponse<CategoryModel>, Category, int>
{
    public GetCategoryByIdQueryHandler(IVivaSeedUnitOfWork uow, IMapper mapper) : base(uow, mapper) {}

    public override async Task<ApiResponse<CategoryModel>> HandleRequest(GetCategoryByIdQuery request, CancellationToken ctn)
    {
        var categoryResponse = await _repository.GetAsync(request.Id, ctn);
        if (categoryResponse is null)
        {
            return ApiResponse<CategoryModel>.Failure($"Category not found with id = '{request.Id}'");
        }

        return ApiResponse<CategoryModel>.SuccessResult(_mapper.Map<CategoryModel>(categoryResponse));
    }
}
