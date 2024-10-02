using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Contracts.ResponseModels;
using MediatR;
using Product.Application.Common;
using Product.Application.Interfaces;

namespace Product.Application.Features.Category.Commands;

public class DeleteCategoryCommand : IRequest<ApiResponse<bool>>
{
    public int Id { get; set; }
}

public class DeleteCategoryHandler : RequestHandler<DeleteCategoryCommand, ApiResponse<bool>>
{
    public DeleteCategoryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper){}

    public override async Task<ApiResponse<bool>> HandleRequest(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var repo = _uow.GetRepository<Domain.Entities.Category, int>();
        var category = await repo.GetAsync(request.Id);
        repo.Remove(category);
        await _uow.SaveAsync();

        return ApiResponse<bool>.Success(true);
    }
}
