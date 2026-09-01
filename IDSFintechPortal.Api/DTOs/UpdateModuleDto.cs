namespace IDSFintechPortal.Api.DTOs
{
    public class UpdateModuleDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ModuleStatusId { get; set; }
        public int ProductId { get; set; }
    }
}