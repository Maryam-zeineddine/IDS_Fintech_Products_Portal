namespace IDSFintechPortal.Api.DTOs
{
    public class UpdateProductResponsibilityDto
    {
        public string Responsibility { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ProductId { get; set; }
        public int TeamMemberId { get; set; }
    }
}
