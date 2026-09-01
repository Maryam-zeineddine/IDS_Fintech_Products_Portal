using Dapper;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class DeploymentModuleRepository : IDeploymentModuleRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public DeploymentModuleRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<DeploymentModule>> GetByDeploymentIdAsync(int deploymentId)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM DeploymentModules WHERE DeploymentId = @DeploymentId";
            return await connection.QueryAsync<DeploymentModule>(sql, new { DeploymentId = deploymentId });
        }

        public async Task<int> CreateAsync(CreateDeploymentModuleDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO DeploymentModules 
                    (DeploymentId, ModuleId)
                VALUES 
                    (@DeploymentId, @ModuleId);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM DeploymentModules WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}