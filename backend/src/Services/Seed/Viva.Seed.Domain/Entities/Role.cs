using Microsoft.AspNetCore.Identity;
using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities;

public class Role : IdentityRole<int>, IEntity<int>
{
    public ICollection<Right> Permissions { get; set; } = [];
}
