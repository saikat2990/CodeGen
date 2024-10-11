namespace Viva.Shared.Contracts;

public class ApiResponse<TResponse>
{
    public TResponse Model { get; set; }
    public bool Success { get; set; }
    public dynamic Message { get; set; }

    public static ApiResponse<TResponse> SuccessResult(TResponse Data, dynamic message = default) =>
        new() { Model = Data, Success = true, Message = message };

    public static ApiResponse<TResponse> FailureResult(dynamic error, TResponse Data = default) =>
        new() { Model = Data, Success = false, Message = error };

    public static ApiResponse<T> EmptyResult<T>() where T : new() => 
        new() { Model = new T(), Success = true, Message = "Empty" };
    
}
