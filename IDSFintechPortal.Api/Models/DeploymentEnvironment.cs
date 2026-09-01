namespace IDSFintechPortal.Api.Models
{
    public class DeploymentEnvironment
    {
        public int Id { get; set; }
        public int DeploymentId { get; set; }
        public string EnvironmentName { get; set; } = string.Empty;
        public string EnvironmentType { get; set; } = string.Empty;
        public string? Purpose { get; set; }
        public string? ServerName { get; set; }
        public string? OperatingSystem { get; set; }
        public string? ApplicationUrl { get; set; }
        public string? DatabaseInfo { get; set; }
        public string? MonitoringLink { get; set; }
        public string? AccessInstructions { get; set; }
        public string? Notes { get; set; }
    }
}