using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Viva.Shared.Models;

namespace Viva.Shared.Helpers;

public class GridDataFetchManager
{
    private readonly IMapper _mapper;

    public GridDataFetchManager(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<ListViewModel<TResponse>> GetListViewDataAsync<TEntity, TResponse>(IQueryable<TEntity> query, GridDataFetchRequest request, CancellationToken ctn = default)
        where TResponse : class
        where TEntity : class
    {
        var result = new ListViewModel<TResponse>();

        // TODO: implement paging, searching, and filtering
        var queryBuilder = await new GridQueryBuilder<TEntity, GridDataFetchRequest>(query, request).ExecuteAsync();

        result.TotalRowCount = queryBuilder.TotalCount;
        result.DataRow = await queryBuilder.Query.ProjectTo<TResponse>(_mapper.ConfigurationProvider).ToListAsync(ctn);

        return result;
    }
}
