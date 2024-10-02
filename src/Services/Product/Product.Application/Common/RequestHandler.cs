using AutoMapper;
using Contracts.ResponseModels;
using MediatR;
using Product.Application.Interfaces;

namespace Product.Application.Common;

public abstract class RequestHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    
{
    protected readonly IProductUnitOfWork _uow;
    protected readonly IMapper _mapper;

    protected RequestHandler(IProductUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken)
    {
        return HandleRequest(request, cancellationToken);
    }

    public abstract Task<TResponse> HandleRequest(TRequest request, CancellationToken cancellationToken);
}
