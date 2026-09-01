namespace IDSFintechPortal.Api.DTOs
{
    public class UpdateDeploymentDto
    {
        public int ProductId { get; set; }
        public int ClientId { get; set; }
        public string? ProductVersion { get; set; }
        public DateTime? GoLiveDate { get; set; }
        public int DeploymentStatusId { get; set; }
        public string? SupportTier { get; set; }
        public string? ClientSpecificNotes { get; set; }
    }
}