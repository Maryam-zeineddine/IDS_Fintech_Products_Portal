namespace IDSFintechPortal.Api.DTOs
{
    public class CreateClientDto
    {
        public string CompanyName { get; set; } = string.Empty;
        public string? Country { get; set; }
        public string? ContactInfo { get; set; }
        public int ClientStatusId { get; set; }
        public string? Notes { get; set; }
    }
}