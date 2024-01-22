using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Domain.Repositories;
using MediatR;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class GetCountOfAssessmentPendingQueryHandler : IRequestHandler<GetCountOfAssessmentPendingQuery, int>
    {
        #region Constructor
        private readonly IUserResultRepository _userResultRepository;
        public GetCountOfAssessmentPendingQueryHandler(IUserResultRepository userResultRepository)
        {
            _userResultRepository = userResultRepository;
        }
        #endregion
        #region Get count of pending assessments
        public async Task<int> Handle(GetCountOfAssessmentPendingQuery request, CancellationToken cancellationToken)
        {
            var userResults = await _userResultRepository.GetUserResultByIdAsync(request.UserId);
            return userResults.Count(u => u.Status == "pending");
        }
        #endregion
    }
}
