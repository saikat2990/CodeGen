using AutoMapper;
using MediatR;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.Repositories;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Shared.Infrastructures.RequestHandlers;

public abstract class BaseRequestHandler<TRequest, TResponse, TEntity, TKey> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TKey : IEquatable<TKey>
    where TEntity : class, IEntity<TKey>

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

    public static bool IsEmpty<T>(T value)
    {
        return typeof(T) switch
        {
            Type t when t == typeof(int) => EqualityComparer<T>.Default.Equals(value, default(T)),
            Type t when t == typeof(string) => string.IsNullOrEmpty(value as string), 
            Type t when t.IsValueType => EqualityComparer<T>.Default.Equals(value, default(T)),
            _ => false // Default case for unhandled types
        };
    }
}
