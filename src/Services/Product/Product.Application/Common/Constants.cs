using Product.Application.Features.Category.Commands;

namespace Product.Application.Common;

public static class Constants
{
    public const string CreateSuccessMsg = "Data Created Successfully.";

    public static string UpdateSuccessMsg = "Data Updated Successfully.";

    public static class Validation
    {
        public const int MaxShortTextLength = 200;

        public const int MaxLongTextLength = 4000;

        public static string DataNotFound(string item) => $"{item} not found.";
        public static string DataAlreadyExists(string item, string value) => $"{item} with name '{value}' already exists.";
    }

    public static class CategoryErrors
    {
        public const string NameAlreadyExists = "Category name already exists";

        
    }
}
