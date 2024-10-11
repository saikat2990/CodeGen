using Viva.Seed.Domain.Enums;
using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities.defaults;

public class AppComponent : EntityAuditable, IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; } = true;
    public ModuleType ModuleId { get; set; } = ModuleType.None; // Table will come later
    public PageType PageType { get; set; } = PageType.None;

    public string? TemplateName { get; set; }
    public string? ServiceName { get; set; }
    public string? EntryFunc { get; set; }
    public string? PageLayout { get; set; } // json

    public ICollection<AppMenu> AppMenus { get; set; } = [];
}
