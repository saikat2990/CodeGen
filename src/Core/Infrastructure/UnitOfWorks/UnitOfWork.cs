using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.UnitOfWorks;

public class UnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
{
    protected readonly TContext _context;
    private Dictionary<Type, object> _typeRepositoryDict;

    public UnitOfWork(TContext context)
    {
        _context = context;
        _typeRepositoryDict = [];
    }

    public int Save() => _context.SaveChanges();
    public async Task<int> SaveAsync(CancellationToken ctn) => await _context.SaveChangesAsync(ctn);

    public IRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : class
    {
        var type = typeof(TEntity);
        if (_typeRepositoryDict.ContainsKey(type))
        {
            return (IRepository<TEntity, TKey>)_typeRepositoryDict[type];
        }

        var repository = new Repository<TEntity, TKey>(_context);
        _typeRepositoryDict.Add(type, repository);
        return repository;
    }
}
