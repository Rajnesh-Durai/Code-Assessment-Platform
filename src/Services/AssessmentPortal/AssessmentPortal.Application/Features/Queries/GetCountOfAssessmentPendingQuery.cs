using MediatR;

namespace AssessmentPortal.Application.Features.Queries
{
    public class GetCountOfAssessmentPendingQuery : IRequest<int>
    {
        public Guid UserId { get; set; }
    }
}
