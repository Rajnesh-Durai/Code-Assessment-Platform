using AssessmentPortal.Application.Features.Commands;
using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AssessmentPortal.API.Controllers
{
    [Route("User")]
    [ApiController]
    public class UserController : BaseController
    {
        #region Constructor
        private readonly IMapper _mapper;
        public UserController(IMediator mediator, IMapper mapper) : base(mediator)
        {
            _mapper = mapper;
        }
        #endregion
        [HttpGet("GetUserById")]
        public async Task<ActionResult<UserResponse>> GetUserById(Guid userId)
        {
            var query = new GetUserQuery { UserId = userId };
            var userAssessment = await Mediator.Send(query);
            return Ok(userAssessment);
        }
        #region Add new User
        [HttpPost("AddNewUser")]
        public async Task<IActionResult> AddUser(UserDTO userDto)
        {
            var user = _mapper.Map<CreateUserCommand>(userDto);
            var result = await Mediator.Send(user);
            return Ok(result);

        }
        #endregion
    }
}
