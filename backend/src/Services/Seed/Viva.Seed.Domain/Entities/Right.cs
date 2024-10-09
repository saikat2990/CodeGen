using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities;

public class Right : IEntity<int>
{
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<Role> Rights { get; set; } = [];
}
