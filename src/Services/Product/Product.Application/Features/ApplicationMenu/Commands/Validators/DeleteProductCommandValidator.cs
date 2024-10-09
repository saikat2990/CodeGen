using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace ApplicationMenu.Application.Features.ApplicationMenu.Commands.Validators;

public class DeleteApplicationMenuCommandValidator : BaseValidator<DeleteApplicationMenuCommand>
{

    public DeleteApplicationMenuCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
    }
}
