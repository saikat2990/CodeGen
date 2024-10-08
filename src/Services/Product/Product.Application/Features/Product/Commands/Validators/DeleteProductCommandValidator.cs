using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Product.Commands.Validators;

public class DeleteProductCommandValidator : BaseValidator<DeleteProductCommand>
{

    public DeleteProductCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
    }
}
