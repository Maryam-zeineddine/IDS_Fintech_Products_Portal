namespace IDSFintechPortal.Api.DTOs
{
    public class CreateModuleDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ModuleStatusId { get; set; }
        public int ProductId { get; set; }
    }
}
   