using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities.defaults;

public class Right : IEntity<int>
{
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<Role> Roles { get; set; } = [];
    public ICollection<AppMenu> AppMenus { get; set; } = [];
}
