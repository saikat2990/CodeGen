using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Category.Commands.Validators;

public class CreateCategoryCommandValidator : BaseValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength)
            .MustAsync(async (_, name, ctn) =>
            {
                var isCategoryNameExists = await uow.GetRepository<Domain.Entities.Category, int>()
                    .AnyAsync(cat => cat.Name.ToLower().Equals(name.ToLower()), ctn);

                return isCategoryNameExists is false;
            })
            .WithMessage((_, name) => Constants.Validation.DataAlreadyExists($"Category", name));

        RuleFor(x => x.Description)
            .MaximumLength(Constants.Validation.MaxLongTextLength);
    }
}
