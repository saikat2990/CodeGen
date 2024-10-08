using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Category.Commands.Validators;

public class UpdateCategoryCommandValidator : BaseValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .MustAsync(async (rootObject, catId, ctn) =>
            {
                var isCategoryExists = await uow.GetRepository<Domain.Entities.Category, int>()
                    .AnyAsync(cat => cat.Id == catId, ctn);

                return isCategoryExists;
            })
            .WithMessage(Constants.Validation.DataNotFound("Category"));

        RuleFor(x => x.Name)
            .MaximumLength(Constants.Validation.MaxShortTextLength)
            .MustAsync(async (rootObject, catName, ctn) =>
            {
                var isCategoryNameDuplicate = await uow.GetRepository<Domain.Entities.Category, int>()
                    .AnyAsync(cat => cat.Name.ToLower().Equals(catName.ToLower()) && cat.Id != rootObject.Id, ctn);

                return isCategoryNameDuplicate is false;
            })
            .WithMessage((rootObject, catName) => Constants.Validation.DataAlreadyExists($"Category", catName));

        RuleFor(x => x.Description)
            .MaximumLength(Constants.Validation.MaxLongTextLength);
    }
}
