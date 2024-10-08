using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Product.Commands.Validators;

public class DeleteProductCommandValidator : BaseValidator<DeleteProductCommand>
{

    public DeleteProductCommandValidator(IProductUnitOfWork uow)
    {

        RuleFor(x => x.Id)
            .GreaterThan(0)
            .MustAsync(async (rootObject, id, ctn) =>
            {
                var isProductExists = await uow.GetRepository<Domain.Entities.Product, int>()
                    .AnyAsync(x => x.Id == id, ctn);
                
                return isProductExists;
            })
            .WithMessage((_, id) => Constants.Validation.DataNotFound($"Product with id = '{id}'"));
    }
}
