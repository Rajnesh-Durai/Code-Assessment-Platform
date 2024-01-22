using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Domain.Repositories;
using MediatR;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class GetCountOfCompletedAssessmentQueryHandler : IRequestHandler<GetCountOfCompletedAssessmentQuery, int>
    {
        #region Constructor
        private readonly IUserResultRepository _userResultRepository;
        public GetCountOfCompletedAssessmentQueryHandler(IUserResultRepository userResultRepository)
        {
            _userResultRepository = userResultRepository;
        }
        #endregion
        #region Get count of completed assessments
        public async Task<int> Handle(GetCountOfCompletedAssessmentQuery request, CancellationToken cancellationToken)
        {
            var userResults = await _userResultRepository.GetUserResultByIdAsync(request.UserId);
            return userResults.Count(u => u.Status == "completed");
        }
        #endregion
    }
}
