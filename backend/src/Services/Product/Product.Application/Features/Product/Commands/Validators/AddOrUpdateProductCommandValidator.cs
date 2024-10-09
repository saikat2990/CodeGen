﻿using FluentValidation;
using Product.Application.Common;
using Product.Application.Interfaces;
using Shared.Behaviors;

namespace Product.Application.Features.Product.Commands.Validators;

public class AddOrUpdateProductCommandValidator : BaseValidator<AddOrUpdateProductCommand>
{

    public AddOrUpdateProductCommandValidator(IProductUnitOfWork uow)
    {
        RuleFor(x => x.Id)
            .NotNull()
            .MustAsync(async (rootObject, id, ctn) =>
            {
                var isProductExists = await uow.GetRepository<Domain.Entities.Product, int>()
                    .AnyAsync(x => x.Id == id, ctn);

                return isProductExists;
            })
            .When(x => x.Id > 0)
            .WithMessage((_, id) => Errors.DataNotFound($"Product with id = '{id}'"));

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(Constants.Validation.MaxShortTextLength);

        RuleFor(x => x.Description)
            .MaximumLength(Constants.Validation.MaxLongTextLength);

        RuleFor(x => x.Price).GreaterThan(0);
        RuleFor(x => x.Stock).GreaterThanOrEqualTo(0);

        RuleFor(x => x.CategoryId)
            .NotNull()
            .MustAsync(async (rootObject, catId, ctn) =>
            {
                var isCategoryExists = await uow.GetRepository<Domain.Entities.Category, int>()
                    .AnyAsync(x => x.Id == catId, ctn);

                return isCategoryExists;
            })
            .WithMessage((_, catId) => Errors.DataNotFound($"Category with id = '{catId}'"));
    }
}