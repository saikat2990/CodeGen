using Microsoft.AspNetCore.Razor.TagHelpers;
using Newtonsoft.Json;

namespace Viva.Shared.Models;

public class GridDataFetchRequest
{
    public Pagination? Pagination { get; set; }

    public Search? Search { get; set; }

    public Sort? Sort { get; set; }
}

public class Pagination
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }

    public int GetPageNumber => PageNumber > 0 ? PageNumber : 1;
    public int GetPageSize => PageSize > 0 ? PageSize : 10;
}

public class Search
{
    public string Value { get; set; }
    public string Operator { get; set; } = "contains"; // <, >, <=, >=, =, contains


    private List<string> _fields = [];

    public List<string> Fields
    {
        get => _fields.Select(f => char.ToUpper(f[0]) + f.Substring(1)).ToList();
        set => _fields = value;
    }

}

public class Sort
{
    public string FieldName { get; set; }

    public string Direction { get; set; }
}
