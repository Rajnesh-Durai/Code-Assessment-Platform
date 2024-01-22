namespace AssessmentPortal.Domain.CoreModels
{
    public class Role
    {
        public int? Id { get; set; }
        public string Role_name { get; set; } = string.Empty;
        public int? Created_by { get; set; }
        public DateTime Created_on { get; set; }
        public int? Modified_by { get; set; }
        public DateTime Modified_on { get; set; }
        public int? Deleted_by { get; set; }
        public DateTime? Deleted_on { get; set; }
        public bool IsActive => Created_by.HasValue;
    }
}
