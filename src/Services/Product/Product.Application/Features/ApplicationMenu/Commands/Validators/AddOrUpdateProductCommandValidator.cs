using FluentValidation;
using Shared.Behaviors;
using Product.Application.Interfaces;
using Product.Application.Features.ApplicationMenu.Commands;
using Product.Application.Common;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Commands.Validators;

public class AddOrUpdateApplicationMenuCommandValidator : BaseValidator<AddOrUpdateApplicationMenuCommand>
{
    public AddOrUpdateApplicationMenuCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .NotNull()
            .MustAsync(async (rootObject, id, ctn) =>
            {
                var isApplicationMenuExists = await uow.GetRepository<Product.Domain.Entities.ApplicationMenu, Guid>()
                    .AnyAsync(x => x.Id == id, ctn);

                return isApplicationMenuExists;
            })
            .When(x => x.Id > Guid.Empty)
            .WithMessage((_, id) => Errors.DataNotFound($"ApplicationMenu with id = '{id}'"));

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength);

        RuleFor(x => x.TemplateName)
            .MaximumLength(Constants.Validation.MaxLongTextLength);
    }
}
