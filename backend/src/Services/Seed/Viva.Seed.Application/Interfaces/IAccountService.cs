using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viva.Seed.Domain.Entities;
using Viva.Shared.Contracts;

namespace Viva.Seed.Application.Interfaces;

public interface IAccountService
{
    Task<ServiceResult<ApplicationUser, IEnumerable<string>>> RegisterAsync(LoginModel model);
    Task<ServiceResult<ApplicationUser, string>> LoginAsync(LoginModel model);
}
