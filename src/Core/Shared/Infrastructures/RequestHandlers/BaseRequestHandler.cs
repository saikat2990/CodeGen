using AutoMapper;
using MediatR;
using Shared.Infrastructures.Repositories;
using Shared.Infrastructures.UnitOfWorks;

namespace Shared.Infrastructures.RequestHandlers;

public abstract class BaseRequestHandler<TRequest, TResponse, TEntity, TKey> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TEntity : class

{
    protected readonly IUnitOfWork _uow;
    protected readonly IMapper _mapper;
    protected readonly IRepository<TEntity, TKey> _repository;

    protected BaseRequestHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
        _repository = _uow.GetRepository<TEntity, TKey>();
    }

    public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken)
    {
        return HandleRequest(request, cancellationToken);
    }

    public abstract Task<TResponse> HandleRequest(TRequest request, CancellationToken cancellationToken);
}
