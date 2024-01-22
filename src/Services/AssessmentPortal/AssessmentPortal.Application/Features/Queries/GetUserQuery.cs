using AssessmentPortal.Application.ViewModels;
using MediatR;

namespace AssessmentPortal.Application.Features.Queries
{
    public class GetUserQuery : IRequest<UserResponse>
    {
        public Guid UserId { get; set; }
    }
}
