
namespace Shared.Contracts;

public class ApiResponse<TResponse>
{
    public TResponse Model { get; set; }
    public bool IsSuccess { get; set; }
    public string Message { get; set; }

    public static ApiResponse<TResponse> Success(TResponse Data, string message = default) =>
        new() { Model = Data, IsSuccess = true, Message = message };

    public static ApiResponse<TResponse> Failure(string errorMessage, TResponse Data = default) =>
        new() { Model = Data, IsSuccess = false, Message = errorMessage };

    public static ApiResponse<bool> Failure(object deleteFailed)
    {
        throw new NotImplementedException();
    }
}
