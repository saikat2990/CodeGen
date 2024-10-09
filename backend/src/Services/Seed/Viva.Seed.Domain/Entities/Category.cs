using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities;

public class Category : EntityAuditable, IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<Product> Products { get; set; } = [];
}
