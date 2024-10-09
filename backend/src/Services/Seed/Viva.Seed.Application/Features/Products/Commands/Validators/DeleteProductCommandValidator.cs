using FluentValidation;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Behaviors;

namespace Viva.Seed.Application.Features.Products.Commands.Validators;

public class DeleteProductCommandValidator : BaseValidator<DeleteProductCommand>
{

    public DeleteProductCommandValidator(IVivaSeedUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
    }
}
