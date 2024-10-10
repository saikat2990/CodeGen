namespace Viva.Shared.Contracts;

public class ServiceResult<TData, TError>
{
    public bool IsSuccess { get; set; }
    public TData Data { get; set; }
    public TError Error { get; set; }

    public ServiceResult(TData data)
    {
        IsSuccess = true;
        Data = data;
    }

    public ServiceResult(TError error)
    {
        Error = error;
        IsSuccess = false;
    }
}
