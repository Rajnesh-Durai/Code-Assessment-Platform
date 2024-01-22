using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AssessmentPortal.API.Controllers
{
    [Route("AssessmentQuestion")]
    [ApiController]
    public class AssessmentQuestionController : BaseController
    {
        #region Constructor
        private readonly ILogger<AssessmentQuestionController> _logger;
        public AssessmentQuestionController(IMediator mediator, ILogger<AssessmentQuestionController> logger) : base(mediator)
        {
            _logger = logger;
        }
        #endregion
        [HttpGet("GetAssessmentQuestionDetailsById")]
        public async Task<ActionResult<List<AssessmentQuestionResponse>>> GetAssessmentQuestionsById(Guid userAssessmentId)
        {
            _logger.LogInformation("Get the assessment details by id: {userAssessmentId}", userAssessmentId);
            var query = new GetAssessmentQuestionQuery { UserAssessmentId = userAssessmentId };
            _logger.LogInformation($"Returned values: {query}");
            var assessmentQuestionDetails = await Mediator.Send(query);
            return Ok(assessmentQuestionDetails);
        }
    }
}
