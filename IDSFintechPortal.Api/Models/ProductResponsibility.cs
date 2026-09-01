namespace IDSFintechPortal.Api.Models
{
    public class ProductResponsibility
    {
        public int Id { get; set; }
        public string Responsibility { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ProductId { get; set; }
        public int TeamMemberId { get; set; }
    }
}