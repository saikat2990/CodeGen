using FluentValidation;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Behaviors;
using Viva.Seed.Application.Features.Categories.Commands;

namespace Viva.Seed.Application.Features.Categories.Commands.Validators;

public class DeleteCategoryCommandValidator : BaseValidator<DeleteCategoryCommand>
{
    public DeleteCategoryCommandValidator(IVivaSeedUnitOfWork uow)
    {
        RuleFor(x => x.IdList)
            .Must((_, ids) => ids.Count > 0)
            .WithMessage(Constants.ListEmptyMsg);
             
    }
}
