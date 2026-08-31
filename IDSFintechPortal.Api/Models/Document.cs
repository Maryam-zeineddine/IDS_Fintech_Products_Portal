namespace IDSFintechPortal.Api.Models
{
    public class Document
    {
        public int Id { get; set; }
        public string DocumentName { get; set; } = string.Empty;
        public string? DocumentType { get; set; }
        public int ProductId { get; set; }
        public string? Description { get; set; }
        public string? FileReference { get; set; }
        public DateOnly? LastUpdatedDate { get; set; }
    }
}