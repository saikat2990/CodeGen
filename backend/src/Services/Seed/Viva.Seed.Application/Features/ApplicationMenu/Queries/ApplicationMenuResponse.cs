﻿using Viva.Seed.Application.Features.AppComponent.Queries;

namespace Product.Application.Features.ApplicationMenu.Queries;
public class ApplicationMenuResponse
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
    public Guid? AppComponentId { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
    public AppComponentResponse? AppComponent { get; set; }
}
