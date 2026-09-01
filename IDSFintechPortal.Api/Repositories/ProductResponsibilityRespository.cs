using Dapper;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Repositories
{
    public class ProductResponsibilityRepository : IProductResponsibilityRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public ProductResponsibilityRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }   

        public async Task<IEnumerable<ProductResponsibility>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM ProductResponsibilities";
            return await connection.QueryAsync<ProductResponsibility>(sql);
        }

        public async Task<ProductResponsibility?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM ProductResponsibilities WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<ProductResponsibility>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(CreateProductResponsibilityDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO ProductResponsibilities 
                    (ProductId, TeamMemberId, Responsibility, Description)
                VALUES 
                    (@ProductId, @TeamMemberId, @Responsibility, @Description);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateProductResponsibilityDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE ProductResponsibilities
                SET ProductId = @ProductId,
                    TeamMemberId = @TeamMemberId,
                    Responsibility = @Responsibility,
                    Description = @Description
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.ProductId,
                dto.TeamMemberId,
                dto.Responsibility,
                dto.Description
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM ProductResponsibilities WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}