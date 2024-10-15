using FluentValidation;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Features.AppComponents.Commands;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Behaviors;
using Viva.Shared.Infrastructures.UnitOfWorks;

namespace Viva.Seed.Application.Features.AppComponents.Commands.Validators;

public class AddOrUpdateAppComponentCommandValidator : BaseValidator<AddOrUpdateAppComponentCommand>
{
    public AddOrUpdateAppComponentCommandValidator(IVivaSeedUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .MustAsync(async (rootObject, catId, ctn) =>
            {
                var isAppComponentExists = await uow.GetRepository<Viva.Seed.Domain.Entities.defaults.AppComponent, int>()
                    .AnyAsync(cat => cat.Id == catId, ctn);

                return isAppComponentExists;
            })
            .When(x => x.Id > 0)
            .WithMessage(Errors.DataNotFound("AppComponent"));

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength)
            .MustAsync(async (rootObject, catName, ctn) =>
            {
                var isAppComponentNameDuplicate = await uow.GetRepository<Viva.Seed.Domain.Entities.defaults.AppComponent, int>()
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
