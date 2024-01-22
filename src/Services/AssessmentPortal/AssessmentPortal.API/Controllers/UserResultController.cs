using AssessmentPortal.Application.Features.Commands;
using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AssessmentPortal.API.Controllers
{
    [Route("UserResult")]
    [ApiController]
    public class UserResultController : BaseController
    {
        #region Constructor
        private readonly IMapper _mapper;
        public UserResultController(IMediator mediator, IMapper mapper) : base(mediator)
        {
            _mapper = mapper;
        }
        #endregion
        [HttpGet("GetUserResultById")]
        public async Task<ActionResult<List<UserResultResponse>>> GetUserResultById(Guid userId)
        {
            var query = new GetUserResultQuery { UserId = userId };
            var userAssessment = await Mediator.Send(query);
            return Ok(userAssessment);
        }
        [HttpGet("GetCountOfAssessmentPending")]
        public async Task<ActionResult<int>> GetCountOfAssessmentPending(Guid userId)
        {
            var query = new GetCountOfAssessmentPendingQuery { UserId = userId };
            var userAssessment = await Mediator.Send(query);
            return Ok(userAssessment);
        }
        [HttpGet("GetCountOfCompletedAssessment")]
        public async Task<ActionResult<int>> GetCountOfCompletedAssessment(Guid userId)
        {
            var query = new GetCountOfCompletedAssessmentQuery { UserId = userId };
            var userAssessment = await Mediator.Send(query);
            return Ok(userAssessment);
        }
        [HttpGet("GetLastAssessmentResult")]
        public async Task<ActionResult<UserResultResponse>> GetLastAssessmentResult(Guid userId)
        {
            var query = new GetLastAssessmentResultQuery { UserId = userId };
            var userAssessment = await Mediator.Send(query);
            return Ok(userAssessment);
        }
        [HttpGet("GetTopScoreByUserAssessmentId")]
        public async Task<ActionResult<List<UserResultResponse>>> GetTopScoreByUserAssessmentId(Guid userId)
        {
            var query = new GetTopScoreByUserAssessmentIdQuery { UserId = userId };
            var userAssessment = await Mediator.Send(query);
            return Ok(userAssessment);
        }
        #region Add new User Result
        [HttpPost("AddUserResult")]
        public async Task<IActionResult> AddUserResult(UserResultDTO userResultDto)
        {
            var user = _mapper.Map<CreateUserResultCommand>(userResultDto);
            var result = await Mediator.Send(user);
            return Ok(result);
        }
        #endregion


    }
}
