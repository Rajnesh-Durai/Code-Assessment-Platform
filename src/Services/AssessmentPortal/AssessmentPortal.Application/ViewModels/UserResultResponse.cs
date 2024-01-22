namespace AssessmentPortal.Application.ViewModels
{
    public class UserResultResponse
    {
        public int? Id { get; set; }
        public Guid? User_id { get; set; }
        public Guid? User_assessment_id { get; set; }
        public string Topic_name { get; set; } = string.Empty;
        public string Skill_level { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int? Score { get; set; }
        public int? Correct_answer { get; set; }
        public int? Wrong_answer { get; set; }
        public int? Top_score { get; set; }
    }
}
