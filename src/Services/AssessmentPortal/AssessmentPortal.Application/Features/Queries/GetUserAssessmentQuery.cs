using AssessmentPortal.Application.ViewModels;
using MediatR;

namespace AssessmentPortal.Application.Features.Queries
{
    public class GetUserAssessmentQuery : IRequest<List<UserAssessmentDetailResponse>>
    {
        public Guid UserId { get; set; }
    }
}
