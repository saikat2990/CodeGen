using FluentValidation;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Features.ApplicationMenu.Commands;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Behaviors;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Commands.Validators;

public class DeleteApplicationMenuCommandValidator : BaseValidator<DeleteApplicationMenuCommand>
{

    public DeleteApplicationMenuCommandValidator(IVivaSeedUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
    }
}
