using Product.Domain.Common;

namespace Product.Domain.Entities;
public class Category : EntityBase<int>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<Product> Products { get; set; } = [];

}
