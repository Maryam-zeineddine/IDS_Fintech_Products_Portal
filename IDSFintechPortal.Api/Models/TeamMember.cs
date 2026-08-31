namespace IDSFintechPortal.Api.Models
{
    public class TeamMember
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string? Department { get; set; }
        public string? JobTitle { get; set; }
        public string Email { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}