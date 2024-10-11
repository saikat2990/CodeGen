using System.Linq.Expressions;
using Viva.Shared.Models;

namespace Viva.Shared.Helpers;

public class GridOperations
{
    public IQueryable<T> Search<T>(IQueryable<T> query, Search search)
        where T : class
    {
        if (search == null || string.IsNullOrEmpty(search.Value) || search.Fields == null || !search.Fields.Any())
        {
            return query;
        }

        var parameter = Expression.Parameter(typeof(T), "x");
        Expression? combinedExpression = null;

        foreach (var field in search.Fields)
        {
            // Ensure the field exists on the entity
            var property = typeof(T).GetProperty(field);
            if (property == null) continue;

            var left = Expression.Property(parameter, property);
            Expression? right = null;

            // Parse the value
            var targetValue = Expression.Constant(Convert.ChangeType(search.Value, property.PropertyType));

            // Generate the expression based on the operator
            Expression? filterExpression = search.Operator.ToLower() switch
            {
                "=" => Expression.Equal(left, targetValue),
                ">" => Expression.GreaterThan(left, targetValue),
                "<" => Expression.LessThan(left, targetValue),
                ">=" => Expression.GreaterThanOrEqual(left, targetValue),
                "<=" => Expression.LessThanOrEqual(left, targetValue),
                "contains" when property.PropertyType == typeof(string) => Expression.Call(
                    left, typeof(string).GetMethod("Contains", new[] { typeof(string) })!, targetValue),
                _ => null
            };

            if (filterExpression != null)
            {
                combinedExpression = combinedExpression == null
                    ? filterExpression
                    : Expression.OrElse(combinedExpression, filterExpression);
            }
        }

        if (combinedExpression != null)
        {
            var lambda = Expression.Lambda<Func<T, bool>>(combinedExpression, parameter);
            query = query.Where(lambda);
        }

        return query;
    }

    public IOrderedQueryable<T> Sort<T>(IQueryable<T> query, Sort sort)
    {
        SortOrder direction = (SortOrder)Enum.Parse(typeof(SortOrder), sort.Direction, ignoreCase: true);
        var orderBy = direction == SortOrder.Asc ? "OrderBy" : "OrderByDescending";

        ParameterExpression parameterExpression = Expression.Parameter(typeof(T), string.Empty);
        MemberExpression memberExpression = Expression.PropertyOrField(parameterExpression, sort.FieldName);
        LambdaExpression expression = Expression.Lambda(memberExpression, parameterExpression);
        MethodCallExpression expression2 = Expression.Call(typeof(Queryable), orderBy, new Type[2]
        {
            typeof(T),
            memberExpression.Type
        }, query.Expression, Expression.Quote(expression));

        return (IOrderedQueryable<T>) query.Provider.CreateQuery<T>(expression2);
    }

    public IQueryable<T> Paginate<T>(IQueryable<T> query, Pagination pagination)
    {
        return query
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize);
    }
}
