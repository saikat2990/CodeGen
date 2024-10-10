using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Viva.Shared.Models;

namespace Viva.Shared.Services;

public class GridDataFetchManager
{
    private readonly IMapper _mapper;

    public GridDataFetchManager(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<ListViewModel<TResponse>> GetListViewDataAsync<TEntity, TResponse>(IQueryable<TEntity> query, GridDataFetchModel request, CancellationToken ctn = default)
        where TResponse : class
        where TEntity : class
    {
        var result = new ListViewModel<TResponse>();

        // TODO: implement paging, searching, and filtering

        result.TotalRowCount = query.Count();
        result.DataRow = await query.ProjectTo<TResponse>(_mapper.ConfigurationProvider).ToListAsync(ctn);

        return result;
    }
}
