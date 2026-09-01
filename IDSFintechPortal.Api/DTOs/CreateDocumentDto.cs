namespace IDSFintechPortal.Api.DTOs
{
    public class CreateDocumentDto
    {
        public string DocumentName { get; set; } = string.Empty;
        public string? DocumentType { get; set; }
        public int ProductId { get; set; }
        public string? Description { get; set; }
        public string? FileReference { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
    }
}