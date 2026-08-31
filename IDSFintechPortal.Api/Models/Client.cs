namespace IDSFintechPortal.Api.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string? Country { get; set; }
        public string? ContactInfo { get; set; }
        public int ClientStatusId { get; set; }
        public string? Notes { get; set; }
    }
}