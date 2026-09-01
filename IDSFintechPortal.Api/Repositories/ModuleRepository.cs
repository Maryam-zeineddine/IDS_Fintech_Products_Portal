using Dapper;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Repositories
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public ModuleRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Module>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string  sql = "SELECT * FROM Modules";
            return await connection.QueryAsync<Module>(sql);
        }

        public async Task<Module?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Modules WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<Module>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(CreateModuleDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO Modules 
                    (ProductId, Name, Description, ModuleStatusId)
                VALUES 
                    (@ProductId, @Name, @Description, @ModuleStatusId);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateModuleDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE Modules
                SET ProductId = @ProductId,
                    Name = @Name,
                    Description = @Description,
                    ModuleStatusId = @ModuleStatusId
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.ProductId,
                dto.Name,
                dto.Description,
                dto.ModuleStatusId
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM Modules WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}