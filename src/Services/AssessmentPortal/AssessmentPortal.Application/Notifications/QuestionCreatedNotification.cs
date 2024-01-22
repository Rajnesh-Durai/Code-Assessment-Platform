using MediatR;

namespace AssessmentPortal.Application.Notifications
{
    public class QuestionCreatedNotification : INotification
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
