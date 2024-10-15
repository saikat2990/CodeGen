using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viva.Seed.Domain.Enums;

public enum MenuType : int
{
    None = 0,
    Link = 1,
    Dropdown = 2
}

public enum PageType : int
{
    None = 0,
    List = 1,
    Details = 2,
    Tab = 3,
}

public enum ModuleType : int
{
    None = 0,
    Finance = 1,
    Stuff = 2,
    Admin = 3,
    Others = 4
}
