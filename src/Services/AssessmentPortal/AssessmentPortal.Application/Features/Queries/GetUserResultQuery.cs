using AssessmentPortal.Application.ViewModels;
using MediatR;

namespace AssessmentPortal.Application.Features.Queries
{
    public class GetUserResultQuery : IRequest<List<UserResultResponse>>
    {
        public Guid UserId { get; set; }
    }
}
