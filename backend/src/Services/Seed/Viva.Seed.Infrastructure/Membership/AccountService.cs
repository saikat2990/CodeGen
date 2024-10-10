using Microsoft.AspNetCore.Identity;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;
using Viva.Seed.Domain.Entities;
using Viva.Shared.Contracts;

namespace Viva.Seed.Infrastructure.Membership;

public class AccountService : IAccountService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AccountService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<ServiceResult<ApplicationUser, IEnumerable<string>>> RegisterAsync(LoginModel model)
    {
        var newUser = new ApplicationUser(model.Email);
        var result = await _userManager.CreateAsync(newUser, model.Password);

        if (result.Succeeded)
        {
            return new ServiceResult<ApplicationUser, IEnumerable<string>>(newUser);
        }

        return new ServiceResult<ApplicationUser, IEnumerable<string>>(result.Errors.Select(e => e.Description));
    }

    public async Task<ServiceResult<ApplicationUser, string>> LoginAsync(LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user is null)
        {
            return new ServiceResult<ApplicationUser, string>(Errors.DataNotFound($"User with email = '{model.Email}'"));
        }

        var signInResult = await _signInManager.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: false);

        if (signInResult.Succeeded)
        {
            await _signInManager.SignInAsync(user, isPersistent: false);
            return new ServiceResult<ApplicationUser, string>(user);
        }

        return new ServiceResult<ApplicationUser, string>(Constants.LoginFailedMsg);
    }
}
