using Viva.Seed.Application.Features.AppComponents.Queries;

namespace Viva.Seed.Application.Features.ApplicationMenu.Queries;
public class AppMenuResponse
{
    public int Id { get; set; }
    public int? ParentId { get; set; }
    public int TypeId { get; set; }
    public string Name { get; set; }
    public string? Icon { get; set; }
    public string? BadgeText { get; set; }
    public string? Url { get; set; }
    public string? Tooltip { get; set; }
    public int? RightId { get; set; }
    public int? ModuleId { get; set; }
    public int? AppComponentId { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
    public AppComponentResponse? AppComponent { get; set; }
}
