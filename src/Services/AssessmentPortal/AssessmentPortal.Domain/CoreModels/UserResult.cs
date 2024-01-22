namespace AssessmentPortal.Domain.CoreModels
{
    public class UserResult
    {
        public int? Id { get; set; }
        public Guid? User_id { get; set; }
        public Guid? User_assessment_id { get; set; }
        public string Status { get; set; } = string.Empty;
        public int? Score { get; set; }
        public int? Correct_answer { get; set; }
        public int? Wrong_answer { get; set; }
    }
}
