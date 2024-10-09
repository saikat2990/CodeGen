using Product.Application.Features.Product.Queries;

namespace Product.Application.Features.Category.Queries;

public class CategoryResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public IEnumerable<ProductResponse> Products { get; set; } = [];
}
