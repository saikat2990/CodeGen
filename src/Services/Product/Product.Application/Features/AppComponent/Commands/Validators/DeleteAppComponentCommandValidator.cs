using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.AppComponent.Commands.Validators;

public class DeleteAppComponentCommandValidator : BaseValidator<DeleteAppComponentCommand>
{
    public DeleteAppComponentCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
             
    }
}
