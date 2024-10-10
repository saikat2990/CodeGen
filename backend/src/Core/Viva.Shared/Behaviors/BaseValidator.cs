using FluentValidation;

namespace Viva.Shared.Behaviors;

public class BaseValidator<T> : AbstractValidator<T>
{
    public BaseValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;
    }
}
