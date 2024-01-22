using AssessmentPortal.Application.Features.Commands;
using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AssessmentPortal.API.Controllers
{
    [Route("UserAssessment")]
    [ApiController]
    public class UserAssessmentController : BaseController
    {
        #region Constructor
        private readonly IMapper _mapper;
        private readonly ILogger<UserAssessmentController> _logger;
        public UserAssessmentController(IMediator mediator, IMapper mapper, ILogger<UserAssessmentController> logger) : base(mediator)
        {
            _mapper = mapper;
            _logger = logger;
        }
        #endregion
        [HttpGet("GetUserAssessmentById")]
        public async Task<ActionResult<List<UserAssessmentDetailResponse>>> GetUserAssessmentById(Guid userId)
        {

            var query = new GetUserAssessmentQuery { UserId = userId };
            _logger.LogInformation($"Returned values: {query}");
            var userAssessment = await Mediator.Send(query);
            return Ok(userAssessment);
        }
        #region Add new User Assessment
        [HttpPost("AddNewUserAssessment")]
        public async Task<IActionResult> AddUserAssessment(UserAssessmentDTO userAssessmentDto)
        {
            var user = _mapper.Map<CreateUserAssessmentCommand>(userAssessmentDto);
            var result = await Mediator.Send(user);
            return Ok(result);

        }
        #endregion
    }
}
