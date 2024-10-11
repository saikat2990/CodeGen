using Microsoft.AspNetCore.Identity;
using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities.defaults;

public class Role : IdentityRole<int>, IEntity<int>
{
    public ICollection<Right> Rights { get; set; } = [];
    public ICollection<RightRole> RightRoles { get; set; } = [];
}
