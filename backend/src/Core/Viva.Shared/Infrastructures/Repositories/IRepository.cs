using System.Linq.Expressions;

namespace Viva.Shared.Infrastructures.Repositories;

public interface IRepository<TEntity, TKey> where TEntity : class
{
    IQueryable<TEntity> GetAll();
    IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> expression);
    Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> expression, CancellationToken ctn);
    Task<TEntity?> GetAsync(TKey id, CancellationToken cancellationToken);

    Task AddAsync(TEntity entity, CancellationToken cancellationToken);
    Task BulkInsertAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken);

    void Update(TEntity entity);

    // Delete methods
    void Delete(TEntity entity);
    Task<int> BulkDeleteAsync(IEnumerable<TKey> Ids, CancellationToken cancellationToken);
    bool Any(Expression<Func<TEntity, bool>> expression);
    Task<bool> AnyAsync(Expression<Func<TEntity, bool>> expression, CancellationToken ctn);
}
