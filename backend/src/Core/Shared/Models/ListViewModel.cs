namespace Shared.Models;

public class ListViewModel<T>
{
    public int TotalRowCount { get; set; }

    public IEnumerable<T> DataRow { get; set; }

}
