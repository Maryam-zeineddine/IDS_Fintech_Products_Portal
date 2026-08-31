namespace IDSFintechPortal.Api.Models
{
    public class Repository
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string RepoName { get; set; } = string.Empty;
        public string GithubUrl { get; set; } = string.Empty;
        public string? MainBranch { get; set; }
        public string? Description { get; set; }
    }
}