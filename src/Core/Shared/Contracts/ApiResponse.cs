namespace Shared.Contracts;

public class ApiResponse<TResponse>
{
    public TResponse Data { get; set; }
    public bool IsSuccess { get; set; }
    public string Message { get; set; }

    public static ApiResponse<TResponse> Success(TResponse Data, string message = default) =>
        new() { Data = Data, IsSuccess = true, Message = message };

    public static ApiResponse<TResponse> Failure(string errorMessage, TResponse Data = default) =>
        new() { Data = Data, IsSuccess = false, Message = errorMessage };
}
