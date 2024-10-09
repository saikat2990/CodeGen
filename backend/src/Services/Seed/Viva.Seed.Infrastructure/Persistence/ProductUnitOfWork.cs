using Viva.Seed.Application.Interfaces;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Infrastructure.Persistence;

public class ProductUnitOfWork : UnitOfWork<VivaSeedDbContext>, IProductUnitOfWork
{
    public ProductUnitOfWork(VivaSeedDbContext dbContext) : base(dbContext)
    {
    }
}
