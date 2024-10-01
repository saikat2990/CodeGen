using AutoMapper;
using Contracts.ResponseModels;
using MediatR;
using Product.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product.Application.Features.Category.Commands;

public class CreateCategoryCommand : IRequest<ApiResponse<int>>
{
    public string Name { get; set; }
    public string Description { get; set; }
}

public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, ApiResponse<int>>
{
    private readonly IProductUnitOfWork _uow;
    private readonly IMapper _mapper;

    public CreateCategoryHandler(IProductUnitOfWork productUnitOfWork, IMapper mapper)
    {
        _uow = productUnitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<int>> Handle(CreateCategoryCommand request, CancellationToken ctn)
    {
        var category = _mapper.Map<Domain.Entities.Category>(request);

        await _uow.GetRepository<Domain.Entities.Category, int>().AddAsync(category, ctn);
        await _uow.SaveAsync();

        return ApiResponse<int>.Success(category.Id);
    }
}
