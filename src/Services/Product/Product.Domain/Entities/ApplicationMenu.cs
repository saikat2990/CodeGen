using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product.Domain.Entities;
public class ApplicationMenu
{
    public Guid Id { get; set; }
    public Guid? ParentId { get; set; }
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
    public AppComponent? AppComponent { get; set; }
}
