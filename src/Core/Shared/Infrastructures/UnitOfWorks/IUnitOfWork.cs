using Shared.Infrastructures.Repositories;

namespace Shared.Infrastructures.UnitOfWorks;

public interface IUnitOfWork
{
    IRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : class;
    int Save();
    Task<int> SaveAsync(CancellationToken ctn);
}
