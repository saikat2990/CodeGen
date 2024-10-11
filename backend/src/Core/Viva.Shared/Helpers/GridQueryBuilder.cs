using Microsoft.EntityFrameworkCore;
using Viva.Shared.Models;

namespace Viva.Shared.Helpers;

public class GridQueryBuilder<T, TGridRequest>
    where T : class
    where TGridRequest : GridDataFetchRequest
{
    private IQueryable<T> _query;
    private TGridRequest _request;

    public GridQueryBuilder(IQueryable<T> query, TGridRequest request)
    {
        _query = query;
        _request = request;
    }

    public async Task<(IQueryable<T> Query, int TotalCount)> ExecuteAsync()
    {
        var operations = new GridOperations();

        if (_request.Search != null)
        {
            _query = operations.Search(_query, _request.Search);
        }

        int totalCount = await _query.CountAsync();

        if (_request.Sort != null)
        {
            _query = operations.Sort(_query, _request.Sort);
        }

        if (_request.Pagination != null)
        {
            _query = operations.Paginate(_query, _request.Pagination);
        }

        return (_query, totalCount);
    }
}
