namespace AssessmentPortal.Application.ViewModels
{
    public class AssessmentQuestionResponse
    {
        public int? id { get; set; }
        public string question { get; set; } = string.Empty;
        public string sample_input { get; set; } = string.Empty;
        public string sample_output { get; set; } = string.Empty;
        public string expected_input { get; set; } = string.Empty;
        public string expected_output { get; set; } = string.Empty;
    }
}
