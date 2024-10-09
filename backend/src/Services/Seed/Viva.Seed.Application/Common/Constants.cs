namespace Viva.Seed.Application.Common;

public static class Constants
{
    public const string CreateSuccessMsg = "Data Created Successfully.";

    public static string UpdateSuccessMsg = "Data Updated Successfully.";

    public const string DeleteFailedMsg = "Data Deletion Failed.";

    public const string ListEmptyMsg = "List can't be empty.";

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
