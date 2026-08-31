using Dapper;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class RepositoryRepository : IRepositoryRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public RepositoryRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Repository>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Repositories";
            return await connection.QueryAsync<Repository>(sql);
        }

        public async Task<Repository?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Repositories WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<Repository>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(CreateRepositoryDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO Repositories 
                    (ProductId, RepoName, GithubUrl, MainBranch, Description)
                VALUES 
                    (@ProductId, @RepoName, @GithubUrl, @MainBranch, @Description);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateRepositoryDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE Repositories
                SET ProductId = @ProductId,
                    RepoName = @RepoName,
                    GithubUrl = @GithubUrl,
                    MainBranch = @MainBranch,
                    Description = @Description
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.ProductId,
                dto.RepoName,
                dto.GithubUrl,
                dto.MainBranch,
                dto.Description
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM Repositories WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}