using Shared.Contracts;

namespace Product.Domain.Entities;
public class AppComponent : EntityAuditable
{
    public AppComponent()
    {
        ApplicationMenus = new List<ApplicationMenu>();
    }

    public Guid Id { get; set; }
    public int ModuleId { get; set; }
    public string Name { get; set; }
    public string TemplateName { get; set; }
    public string ServiceName { get; set; }
    public string EntryFunc { get; set; }
    public string PageType { get; set; }
    public string PageLayout { get; set; }
    public bool IsActive { get; set; } = true;
    public IEnumerable<ApplicationMenu> ApplicationMenus { get; set; }
}
