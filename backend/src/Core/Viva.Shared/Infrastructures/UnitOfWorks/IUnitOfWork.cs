using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.Repositories;

namespace Viva.Shared.Infrastructures.UnitOfWorks;

public interface IUnitOfWork
{
    IRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
        where TEntity : class, IEntity<TKey>
        where TKey : IEquatable<TKey>;

    int Save();
    Task<int> SaveAsync(CancellationToken ctn);
}
