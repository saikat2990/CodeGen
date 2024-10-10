using Viva.Seed.Application.Interfaces;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Infrastructure.Persistence;

public class VivaSeedUnitOfWork : UnitOfWork<VivaSeedDbContext>, IVivaSeedUnitOfWork
{
    public VivaSeedUnitOfWork(VivaSeedDbContext dbContext) : base(dbContext)
    {
    }
}
