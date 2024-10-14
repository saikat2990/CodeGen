using System.Linq.Expressions;
using Viva.Shared.Exceptions;
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
            var property = typeof(T).GetProperty(field) ?? throw new InvalidRequestFormatException($"Invalid search field: '{field}'");
            var left = Expression.Property(parameter, property);

            object? convertedType = null;
            try
            {
                convertedType = Convert.ChangeType(search.Value, property.PropertyType);
            }
            catch (Exception ex)
            {
                throw new InvalidRequestFormatException($"Invalid search value: '{search.Value}'");
            }

            var targetValue = Expression.Constant(convertedType);
            if (targetValue is null) { continue; }

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
        if (!Enum.TryParse(sort.Direction, ignoreCase: true, out SortOrder direction))
        {
            throw new InvalidRequestFormatException($"Invalid sort direction: '{sort.Direction}'");
        }

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
            .Skip((pagination.GetPageNumber - 1) * pagination.GetPageSize)
            .Take(pagination.GetPageSize);
    }
}
