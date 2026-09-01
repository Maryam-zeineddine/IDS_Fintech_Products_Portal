namespace IDSFintechPortal.Api.Models
{
    public class Module
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ModuleStatusId { get; set; }
        public int ProductId { get; set; }
    }
}