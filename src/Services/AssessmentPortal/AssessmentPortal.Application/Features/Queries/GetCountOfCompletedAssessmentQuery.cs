using MediatR;

namespace AssessmentPortal.Application.Features.Queries
{
    public class GetCountOfCompletedAssessmentQuery : IRequest<int>
    {
        public Guid UserId { get; set; }
    }
}
