using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Category.Commands.Validators;

public class DeleteCategoryCommandValidator : BaseValidator<DeleteCategoryCommand>
{
    public DeleteCategoryCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .MustAsync(async (_, catId, ctn) => 
                await uow.GetRepository<Domain.Entities.Category, int>().AnyAsync(cat => cat.Id == catId, ctn))
            .WithMessage(Constants.Validation.DataNotFound("Category"));    
    }
}
