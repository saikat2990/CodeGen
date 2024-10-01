using Infrastructure.UnitOfWorks;
using Product.Application.Interfaces;

namespace Product.Infrastructure.Persistence;

public class ProductUnitOfWork : UnitOfWork<ProductDbContext>, IProductUnitOfWork
{
    public ProductUnitOfWork(ProductDbContext dbContext) : base(dbContext)
    {
    }
}
