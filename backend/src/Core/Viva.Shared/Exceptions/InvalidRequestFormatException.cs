namespace Viva.Shared.Exceptions;

public class InvalidRequestFormatException : ApplicationException
{
    public InvalidRequestFormatException(string errorMessage)
        : base("Invalid request format.")
    {
        Error = errorMessage;
    }

    public string Error { get; set; }
}
