using AutoMapper;
using Contracts.ResponseModels;
using Infrastructure.RequestHandlers;
using MediatR;
using Product.Application.Common;
using Product.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product.Application.Features.Category.Commands;

public class CreateCategoryCommand : CategoryModel, IRequest<ApiResponse<int>>
{
}

public class CreateCategoryHandler : BaseRequestHandler<CreateCategoryCommand, ApiResponse<int>, Domain.Entities.Category, int>
{
    public CreateCategoryHandler(IProductUnitOfWork uow, IMapper mapper) : base(uow, mapper)
    {
    }

    public override async Task<ApiResponse<int>> HandleRequest(CreateCategoryCommand request, CancellationToken ctn)
    {
        var category = _mapper.Map<Domain.Entities.Category>(request);

        await _repository.AddAsync(category, ctn);
        await _uow.SaveAsync();

        return ApiResponse<int>.Success(category.Id);
    }
}
