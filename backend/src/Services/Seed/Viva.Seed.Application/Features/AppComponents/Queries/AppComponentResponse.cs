﻿

using Viva.Seed.Application.Features.ApplicationMenu.Queries;

namespace Viva.Seed.Application.Features.AppComponents.Queries;
public class AppComponentResponse
{
    public int Id { get; set; }
    public int ModuleId { get; set; }
    public string Name { get; set; }
    public string TemplateName { get; set; }
    public string ServiceName { get; set; }
    public string EntryFunc { get; set; }
    public string PageType { get; set; }
    public string PageLayout { get; set; }
    public bool IsActive { get; set; } = true;
    public IEnumerable<AppMenuResponse> AppMenus { get; set; }
}
