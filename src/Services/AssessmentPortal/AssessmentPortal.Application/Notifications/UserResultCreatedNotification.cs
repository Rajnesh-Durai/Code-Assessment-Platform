using MediatR;

namespace AssessmentPortal.Application.Notifications
{
    public class UserResultCreatedNotification : INotification
    {
        public Guid? User_id { get; set; }
        public Guid? User_assessment_id { get; set; }
        public int? Score { get; set; }
        public int? Correct_answer { get; set; }
        public int? Wrong_answer { get; set; }
    }
}
