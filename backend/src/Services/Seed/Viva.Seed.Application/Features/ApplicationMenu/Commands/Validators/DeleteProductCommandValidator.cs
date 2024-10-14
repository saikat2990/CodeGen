using FluentValidation;
using Viva.Seed.Application.Common;
using Viva.Shared.Behaviors;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Commands.Validators;

public class DeleteApplicationMenuCommandValidator : BaseValidator<DeleteApplicationMenuCommand>
{

    public DeleteApplicationMenuCommandValidator(IUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
    }
}
