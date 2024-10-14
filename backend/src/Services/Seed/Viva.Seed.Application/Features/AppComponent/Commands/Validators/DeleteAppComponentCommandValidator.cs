using FluentValidation;

using Viva.Seed.Application.Common;
using Viva.Shared.Behaviors;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Application.Features.AppComponent.Commands.Validators;

public class DeleteAppComponentCommandValidator : BaseValidator<DeleteAppComponentCommand>
{
    public DeleteAppComponentCommandValidator(IUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
             
    }
}
