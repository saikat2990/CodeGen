using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.AppComponent.Commands.Validators;

public class AddOrUpdateAppComponentCommandValidator : BaseValidator<AddOrUpdateAppComponentCommand>
{
    public AddOrUpdateAppComponentCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .MustAsync(async (rootObject, catId, ctn) =>
            {
                var isAppComponentExists = await uow.GetRepository<Domain.Entities.AppComponent, Guid>()
                    .AnyAsync(cat => cat.Id == catId, ctn);

                return isAppComponentExists;
            })
            .When(x => x.Id > Guid.Empty)
            .WithMessage(Errors.DataNotFound("AppComponent"));

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength)
            .MustAsync(async (rootObject, catName, ctn) =>
            {
                var isAppComponentNameDuplicate = await uow.GetRepository<Domain.Entities.AppComponent, Guid>()
                    .AnyAsync(cat => cat.Name.ToLower().Equals(catName.ToLower()) && cat.Id != rootObject.Id, ctn);

                return isAppComponentNameDuplicate is false;
            })
            .WithMessage((rootObject, catName) => Errors.DataAlreadyExists($"AppComponent", catName));

        RuleFor(x => x.ServiceName)
            .MaximumLength(Constants.Validation.MaxLongTextLength);

        RuleFor(x => x.TemplateName)
            .MaximumLength(Constants.Validation.MaxLongTextLength);
    }
}
