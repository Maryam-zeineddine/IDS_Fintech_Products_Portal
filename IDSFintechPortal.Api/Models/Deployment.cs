namespace IDSFintechPortal.Api.Models
{
    public class Deployment
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int ClientId { get; set; }
        public string? ProductVersion { get; set; }
        public DateTime? GoLiveDate { get; set; }
        public int DeploymentStatusId { get; set; }
        public string? SupportTier { get; set; }
        public string? ClientSpecificNotes { get; set; }
    }
}