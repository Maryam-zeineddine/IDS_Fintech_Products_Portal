using Dapper;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class EnvironmentRepository : IEnvironmentRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public EnvironmentRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<DeploymentEnvironment>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Environments";
            return await connection.QueryAsync<DeploymentEnvironment>(sql);
        }

        public async Task<DeploymentEnvironment?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Environments WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<DeploymentEnvironment>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(CreateEnvironmentDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO Environments 
                    (DeploymentId, EnvironmentName, EnvironmentType, Purpose, ServerName, OperatingSystem, ApplicationUrl, DatabaseInfo, MonitoringLink, AccessInstructions, Notes)
                VALUES 
                    (@DeploymentId, @EnvironmentName, @EnvironmentType, @Purpose, @ServerName, @OperatingSystem, @ApplicationUrl, @DatabaseInfo, @MonitoringLink, @AccessInstructions, @Notes);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateEnvironmentDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE Environments
                SET DeploymentId = @DeploymentId,
                    EnvironmentName = @EnvironmentName,
                    EnvironmentType = @EnvironmentType,
                    Purpose = @Purpose,
                    ServerName = @ServerName,
                    OperatingSystem = @OperatingSystem,
                    ApplicationUrl = @ApplicationUrl,
                    DatabaseInfo = @DatabaseInfo,
                    MonitoringLink = @MonitoringLink,
                    AccessInstructions = @AccessInstructions,
                    Notes = @Notes
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.DeploymentId,
                dto.EnvironmentName,
                dto.EnvironmentType,
                dto.Purpose,
                dto.ServerName,
                dto.OperatingSystem,
                dto.ApplicationUrl,
                dto.DatabaseInfo,
                dto.MonitoringLink,
                dto.AccessInstructions,
                dto.Notes
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM Environments WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}