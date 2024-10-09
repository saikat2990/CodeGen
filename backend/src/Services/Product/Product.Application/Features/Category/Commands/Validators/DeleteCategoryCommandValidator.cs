using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Category.Commands.Validators;

public class DeleteCategoryCommandValidator : BaseValidator<DeleteCategoryCommand>
{
    public DeleteCategoryCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
             
    }
}
