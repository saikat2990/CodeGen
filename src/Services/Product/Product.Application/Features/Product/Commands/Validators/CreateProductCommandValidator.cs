using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Product.Commands.Validators;

public class CreateProductCommandValidator : BaseValidator<CreateProductCommand>
{

    public CreateProductCommandValidator(IProductUnitOfWork uow)
    {

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength);

        RuleFor(x => x.Description)
            .MaximumLength(Constants.Validation.MaxLongTextLength);

        RuleFor(x => x.Price)
            .GreaterThan(0);

        RuleFor(x => x.CategoryId)
            .NotNull()
            .MustAsync(async (rootObject, catId, ctn) =>
            {
                var isCategoryExists = await uow.GetRepository<Domain.Entities.Category, int>()
                    .AnyAsync(x => x.Id == catId, ctn);

                return isCategoryExists;
            })
            .WithMessage((_, catId) => Constants.Validation.DataNotFound($"Category with id = '{catId}'"));
    }
}
