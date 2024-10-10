using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;
using Viva.Shared.Infrastructures.RequestHandlers;

namespace Viva.Seed.Application.Features.Auth.Commands;

public class LoginCommand : LoginModel, IRequest<ApiResponse<LoginResponse>>
{

}

public class LoginCommandHandler : IRequestHandler<LoginCommand, ApiResponse<LoginResponse>>
{
    private readonly IAccountService _accountService;
    private readonly IMapper _mapper;

    public LoginCommandHandler(IAccountService accountService, IMapper mapper)
    {
        _accountService = accountService;
        _mapper = mapper;
    }

    public async Task<ApiResponse<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var result = await _accountService.LoginAsync(request);
        
        return result.IsSuccess 
            ? ApiResponse<LoginResponse>.SuccessResult(_mapper.Map<LoginResponse>(result.Data))
            : ApiResponse<LoginResponse>.FailureResult(result.Error);
    }
}
