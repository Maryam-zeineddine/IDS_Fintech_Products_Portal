using Dapper;
using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public readonly IDbConnectionFactory _connectionFactory;

        public ProductRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Products";
            return await connection.QueryAsync<Product>(sql);
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Products WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<Product>(sql, new {Id = id});
        }

        public async Task<int> CreateAsync(CreateProductDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO Products 
                    (Name, Description, BusinessPurpose, ProductStatusId, CurrentVersion, SupportedMarkets, Criticality, Technologies, Notes)
                VALUES 
                    (@Name, @Description, @BusinessPurpose, @ProductStatusId, @CurrentVersion, @SupportedMarkets, @Criticality, @Technologies, @Notes);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateProductDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE Products
                SET Name = @Name,
                    Description = @Description,
                    BusinessPurpose = @BusinessPurpose,
                    ProductStatusId = @ProductStatusId,
                    CurrentVersion = @CurrentVersion,
                    SupportedMarkets = @SupportedMarkets,
                    Criticality = @Criticality,
                    Technologies = @Technologies,
                    Notes = @Notes
                WHERE Id = @Id;";

            var parameters = new
            {
                ID = id,
                dto.Name,
                dto.Description,
                dto.BusinessPurpose,
                dto.ProductStatusId,
                dto.Criticality,
                dto.CurrentVersion,
                dto.SupportedMarkets,
                dto.Technologies,
                dto.Notes
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const String sql = "DELETE FROM Products WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new {Id = id});
            return rowsAffected > 0;
        }
    }
}