using FluentValidation;
using Viva.Shared.Behaviors;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Application.Features.Categories.Commands.Validators;

public class AddOrUpdateCategoryCommandValidator : BaseValidator<AddOrUpdateCategoryCommand>
{
    public AddOrUpdateCategoryCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .MustAsync(async (rootObject, catId, ctn) =>
            {
                var isCategoryExists = await uow.GetRepository<Category, int>()
                    .AnyAsync(cat => cat.Id == catId, ctn);

                return isCategoryExists;
            })
            .When(x => x.Id > 0)
            .WithMessage(Errors.DataNotFound("Category"));

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength)
            .MustAsync(async (rootObject, catName, ctn) =>
            {
                var isCategoryNameDuplicate = await uow.GetRepository<Category, int>()
                    .AnyAsync(cat => cat.Name.ToLower().Equals(catName.ToLower()) && cat.Id != rootObject.Id, ctn);

                return isCategoryNameDuplicate is false;
            })
            .WithMessage((rootObject, catName) => Errors.DataAlreadyExists($"Category", catName));

        RuleFor(x => x.Description)
            .MaximumLength(Constants.Validation.MaxLongTextLength);
    }
}
