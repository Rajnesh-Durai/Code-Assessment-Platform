namespace Phi_2.Model
{
    public class ApiRequest
    {
        public string question { get; set; } = string.Empty;
        public string sourceCode { get; set; } = string.Empty;
        public string language { get; set; } = string.Empty;
        public string model { get; set; } = string.Empty;
        public string prompt { get; set; } = string.Empty;
    }
}
