namespace IDSFintechPortal.Api.DTOs
{
    public class CreateProductDto
    {
        public string Name {get; set;} = string.Empty;
        public string? Description {get; set;}
        public string? BusinessPurpose { get; set; }
        public int ProductStatusId { get; set; }
        public string? CurrentVersion { get; set; }
        public string? SupportedMarkets { get; set; }
        public string? Criticality { get; set; }
        public string? Technologies { get; set; }
        public string? Notes { get; set; }
    }
}