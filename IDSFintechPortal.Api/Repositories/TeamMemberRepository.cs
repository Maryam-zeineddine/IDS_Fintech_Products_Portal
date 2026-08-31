using Dapper;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class TeamMemberRepository : ITeamMemberRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public TeamMemberRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<TeamMember>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM TeamMembers";
            return await connection.QueryAsync<TeamMember>(sql);
        }

        public async Task<TeamMember?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM TeamMembers WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<TeamMember>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(CreateTeamMemberDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO TeamMembers 
                    (FullName, Department, JobTitle, Email, IsActive)
                VALUES 
                    (@FullName, @Department, @JobTitle, @Email, 1);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateTeamMemberDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE TeamMembers
                SET FullName = @FullName,
                    Department = @Department,
                    JobTitle = @JobTitle,
                    Email = @Email,
                    IsActive = @IsActive
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.FullName,
                dto.Department,
                dto.JobTitle,
                dto.Email,
                dto.IsActive
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM TeamMembers WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}