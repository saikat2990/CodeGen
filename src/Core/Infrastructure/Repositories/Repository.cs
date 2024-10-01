using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading;

namespace Infrastructure.Repositories;

public class Repository<TEntity, TKey> : IRepository<TEntity, TKey> where TEntity : class
{
    protected readonly DbContext _context;
    private readonly DbSet<TEntity> _table;

    public Repository(DbContext context)
    {
        _context = context;
        _table = _context.Set<TEntity>();
    }

    public IQueryable<TEntity> GetAll() => _table;

    public IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> expression) => _table.Where(expression);

    public async Task<TEntity?> GetAsync(TKey id) => await _table.FindAsync(id);

    public async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> expression) => await _table.FirstOrDefaultAsync(expression);

    // Create methods
    public async Task AddAsync(TEntity entity, CancellationToken cancellationToken)
    {
        await _table.AddAsync(entity, cancellationToken);
    }

    public async Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken)
    {
        await _table.AddRangeAsync(entities, cancellationToken);
    }

    // Update method
    public void Update(TEntity entity)
    {
        _table.Update(entity);
    }

    // Delete methods
    public void Remove(TEntity entity)
    {
        _table.Remove(entity);
    }

    public void RemoveRange(IEnumerable<TEntity> entities)
    {
        _table.RemoveRange(entities);
    }

}