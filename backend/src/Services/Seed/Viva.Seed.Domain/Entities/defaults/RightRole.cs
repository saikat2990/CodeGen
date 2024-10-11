using Viva.Shared.Contracts;

namespace Viva.Seed.Domain.Entities.defaults;

public class RightRole : IEntity<int>
{
    public int Id { get; set; }
    public int RightId { get; set; }
    public int RoleId { get; set; }

    public Right Right { get; set; } 
    public Role Role { get; set; }
}
