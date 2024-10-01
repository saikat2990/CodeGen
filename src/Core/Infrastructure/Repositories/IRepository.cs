using System.Linq.Expressions;

namespace Infrastructure.Repositories;

public interface IRepository<TEntity, TKey> where TEntity : class
{
    IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> expression);
    IQueryable<TEntity> GetAll();
    Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> expression);
    Task<TEntity?> GetAsync(TKey id);

    // Create methods
    Task AddAsync(TEntity entity, CancellationToken cancellationToken);
    Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken);

    // Update method
    void Update(TEntity entity);

    // Delete methods
    void Remove(TEntity entity);
    void RemoveRange(IEnumerable<TEntity> entities);

}