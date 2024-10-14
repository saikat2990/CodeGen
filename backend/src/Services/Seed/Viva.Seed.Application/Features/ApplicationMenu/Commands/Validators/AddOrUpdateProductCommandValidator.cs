using FluentValidation;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Features.ApplicationMenu.Commands;
using Viva.Shared.Behaviors;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Commands.Validators;

public class AddOrUpdateApplicationMenuCommandValidator : BaseValidator<AddOrUpdateApplicationMenuCommand>
{
    public AddOrUpdateApplicationMenuCommandValidator(IUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .NotNull()
            .MustAsync(async (rootObject, id, ctn) =>
            {
                var isApplicationMenuExists = await uow.GetRepository<Viva.Seed.Domain.Entities.defaults.ApplicationUser, int>()
                    .AnyAsync(x => x.Id == id, ctn);

                return isApplicationMenuExists;
            })
            .When(x => x.Id >0)
            .WithMessage((_, id) => Errors.DataNotFound($"ApplicationMenu with id = '{id}'"));

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength);

        RuleFor(x => x.TemplateName)
            .MaximumLength(Constants.Validation.MaxLongTextLength);
    }
}
