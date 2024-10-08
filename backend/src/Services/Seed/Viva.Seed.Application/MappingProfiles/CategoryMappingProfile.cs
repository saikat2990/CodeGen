﻿using AutoMapper;
using Viva.Seed.Application.Features.Categories.Commands;
using Viva.Seed.Application.Features.Categories.Queries;
using Viva.Seed.Domain.Entities;

namespace Viva.Seed.Application.MappingProfiles;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<Category, CategoryModel>();
            //.ForMember(d => d.Products, opt => opt.MapFrom(s => s.Products));

        CreateMap<AddOrUpdateCategoryCommand, Category>();
    }
}
