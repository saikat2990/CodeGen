using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading;

namespace Shared.Infrastructures.Repositories;

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

    public async Task<TEntity?> GetAsync(TKey id, CancellationToken ctn) => await _table.FindAsync(id, ctn);

    public async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> expression, CancellationToken ctn) => await _table.FirstOrDefaultAsync(expression, ctn);

    public async Task AddAsync(TEntity entity, CancellationToken ctn)
    {
        await _table.AddAsync(entity, ctn);
    }

    public async Task BulkInsertAsync(IEnumerable<TEntity> entities, CancellationToken ctn)
    {
        await _table.AddRangeAsync(entities, ctn);
    }

    public void Update(TEntity entity)
    {
        _table.Update(entity);
    }

    public void Delete(TEntity entity)
    {
        _table.Remove(entity);
    }

    public void BulkDelete(IEnumerable<TEntity> entities)
    {
        _table.RemoveRange(entities);
    }

}
