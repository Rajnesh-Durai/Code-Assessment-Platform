using MediatR;

namespace AssessmentPortal.Application.Features.Commands
{
    public class CreateUserResultCommand : IRequest<string>
    {
        public Guid? User_id { get; set; }
        public Guid? User_assessment_id { get; set; }
        public int? Score { get; set; }
        public int? Correct_answer { get; set; }
        public int? Wrong_answer { get; set; }
    }
}
