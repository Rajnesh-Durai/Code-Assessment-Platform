namespace AssessmentPortal.Domain.CoreModels
{
    public class UserAssessment
    {
        public Guid? Id { get; set; }
        public Guid? User_id { get; set; }
        public int? Topic_id { get; set; }
        public int? Skill_id { get; set; }
        public int? Number_of_questions { get; set; }
        public int? Total_time { get; set; }
    }
}
