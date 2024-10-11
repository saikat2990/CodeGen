using AutoMapper;
using MediatR;
using Viva.Seed.Application.Common;
using Viva.Seed.Application.Interfaces;
using Viva.Shared.Contracts;

namespace Viva.Seed.Application.Features.Auth.Commands;

public class RegisterCommand : LoginModel, IRequest<ApiResponse<string>>
{

}

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ApiResponse<string>>
{
    private readonly IAccountService _accountService;
    private readonly IMapper _mapper;

    public RegisterCommandHandler(IAccountService accountService, IMapper mapper)
    {
        _accountService = accountService;
        _mapper = mapper;
    }

    public async Task<ApiResponse<string>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var result = await _accountService.RegisterAsync(request);

        return result.IsSuccess 
            ? ApiResponse<string>.SuccessResult(Constants.RegisterSuccessMsg) 
            : ApiResponse<string>.FailureResult(result.Error);
    }
}
