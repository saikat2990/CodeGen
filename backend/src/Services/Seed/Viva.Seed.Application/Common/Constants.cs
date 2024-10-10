namespace Viva.Seed.Application.Common;

public static class Constants
{
    public const string CreateSuccessMsg = "Data created successfully.";

    public const string UpdateSuccessMsg = "Data updated successfully.";

    public const string DeleteFailedMsg = "Data deletion failed.";

    public const string ListEmptyMsg = "List can't be empty.";

    public const string LoginFailedMsg = "Login failed, check your email and password";

    public const string RegisterSuccessMsg = "Registration successful. Please check your email for verification link.";

    public static class Validation
    {
        public const int MaxShortTextLength = 200;

        public const int MaxLongTextLength = 4000;

        
    }
}

public static class Errors
{
    public static string DataNotFound(string item) => $"{item} not found.";
    public static string DataAlreadyExists(string item, string value) => $"{item} with name '{value}' already exists.";
}
