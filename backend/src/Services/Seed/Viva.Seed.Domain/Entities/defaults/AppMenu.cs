using Viva.Seed.Domain.Enums;
using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities.defaults;

public class AppMenu : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
    public MenuType TypeId { get; set; } // link, dropdown (menu behavior)
    public int? ParentId { get; set; }
    public string? Icon { get; set; }
    public string? BadgeText { get; set; } // (new), (hot)
    public string? Url { get; set; }
    public string? Tooltip { get; set; }
    public int? ModuleId { get; set; }

    public int? RightId { get; set; }
    public Right? Right { get; set; }

    public int? AppComponentId { get; set; }
    public AppComponent? AppComponent { get; set; }
}
