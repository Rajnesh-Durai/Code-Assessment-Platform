namespace AssessmentPortal.Application.ViewModels
{
    public class UserAssessmentDetailResponse
    {
        public Guid? Id { get; set; }
        public Guid? User_id { get; set; }
        public int? Skill_id { get; set; }
        public string Skill_level { get; set; } = string.Empty;
        public int? Topic_id { get; set; }
        public string Topic_name { get; set; } = string.Empty;
        public int? Number_of_questions { get; set; }
        public int? Total_time { get; set; }

    }
}
