﻿using Microsoft.AspNetCore.Identity;
using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities;

public class ApplicationUser : IdentityUser<int>, IEntity<int>
{
    public ApplicationUser(string email)
    {
        Email = UserName = email;
    }
}
