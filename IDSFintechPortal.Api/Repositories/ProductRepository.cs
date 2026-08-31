using Dapper;
using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.Interfaces;

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
    }
}