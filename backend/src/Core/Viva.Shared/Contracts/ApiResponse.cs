namespace Viva.Shared.Contracts;

public class ApiResponse<TResponse>
{
    public TResponse Model { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; }

    public static ApiResponse<TResponse> SuccessResult(TResponse Data, string message = default) =>
        new() { Model = Data, Success = true, Message = message };

    public static ApiResponse<TResponse> Failure(string errorMessage, TResponse Data = default) =>
        new() { Model = Data, Success = false, Message = errorMessage };

}
