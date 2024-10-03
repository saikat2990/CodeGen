using Product.Application.Interfaces;
using Shared.Infrastructures.UnitOfWorks;

namespace Product.Infrastructure.Persistence;

public class ProductUnitOfWork : UnitOfWork<ProductDbContext>, IProductUnitOfWork
{
    public ProductUnitOfWork(ProductDbContext dbContext) : base(dbContext)
    {
    }
}
