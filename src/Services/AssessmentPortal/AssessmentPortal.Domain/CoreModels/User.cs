namespace AssessmentPortal.Domain.CoreModels
{
    public class User
    {
        public Guid? Id { get; set; }
        public string First_name { get; set; } = string.Empty;
        public string Last_name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int? Role_id { get; set; }
        public bool IsActive => Id != Guid.Empty;
        public Guid? Created_by { get; set; }
        public DateTime Created_on { get; set; }
        public Guid? Modified_by { get; set; }
        public DateTime? Modified_on { get; set; }
        public Guid? Deleted_by { get; set; }
        public DateTime? Deleted_on { get; set; }
    }
}
