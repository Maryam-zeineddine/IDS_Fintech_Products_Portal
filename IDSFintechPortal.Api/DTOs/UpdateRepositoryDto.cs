namespace IDSFintechPortal.Api.DTOs
{
    public class UpdateRepositoryDto
    {
        public int ProductId { get; set; }
        public string RepoName { get; set; } = string.Empty;
        public string GithubUrl { get; set; } = string.Empty;
        public string? MainBranch { get; set; }
        public string? Description { get; set; }
    }
}