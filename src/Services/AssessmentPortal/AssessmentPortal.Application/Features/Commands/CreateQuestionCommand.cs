using MediatR;

namespace AssessmentPortal.Application.Features.Commands
{
    public class CreateQuestionCommand : IRequest<string>
    {
        public int? Skill_id { get; set; }
        public int? Topic_id { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Sample_input { get; set; } = string.Empty;
        public string Sample_output { get; set; } = string.Empty;
        public string Expected_input { get; set; } = string.Empty;
        public string Expected_output { get; set; } = string.Empty;
    }
}
