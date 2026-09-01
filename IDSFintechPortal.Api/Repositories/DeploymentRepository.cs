using Dapper;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class DeploymentRepository : IDeploymentRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public DeploymentRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Deployment>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Deployments";
            return await connection.QueryAsync<Deployment>(sql);
        }

        public async Task<Deployment?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Deployments WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<Deployment>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(CreateDeploymentDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO Deployments 
                    (ProductId, ClientId, ProductVersion, GoLiveDate, DeploymentStatusId, SupportTier, ClientSpecificNotes)
                VALUES 
                    (@ProductId, @ClientId, @ProductVersion, @GoLiveDate, @DeploymentStatusId, @SupportTier, @ClientSpecificNotes);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateDeploymentDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE Deployments
                SET ProductId = @ProductId,
                    ClientId = @ClientId,
                    ProductVersion = @ProductVersion,
                    GoLiveDate = @GoLiveDate,
                    DeploymentStatusId = @DeploymentStatusId,
                    SupportTier = @SupportTier,
                    ClientSpecificNotes = @ClientSpecificNotes
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.ProductId,
                dto.ClientId,
                dto.ProductVersion,
                dto.GoLiveDate,
                dto.DeploymentStatusId,
                dto.SupportTier,
                dto.ClientSpecificNotes
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM Deployments WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}