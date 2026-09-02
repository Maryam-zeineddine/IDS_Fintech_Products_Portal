using Dapper;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public UserRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Users";
            return await connection.QueryAsync<User>(sql);
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Users WHERE Id = @Id";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Id = id });
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Users WHERE Email = @Email";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<int> CreateAsync(string name, string email, string passwordHash, int roleId)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"INSERT INTO Users (Name, Email, PasswordHash, RoleId, isActive) VALUES (@Name, @Email, @PasswordHash, @RoleId, 1); SELECT CAST(SCOPE_IDENTITY() as int)";
            return await connection.QuerySingleAsync<int>(sql, new { Name = name, Email = email, PasswordHash = passwordHash, RoleId = roleId });
        }

        public async Task<bool> UpdateAsync(int id, string name, string email, int roleId, bool isActive)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"UPDATE Users SET Name = @Name, Email = @Email, RoleId = @RoleId, IsActive = @IsActive WHERE Id = @Id";
            var affectedRows = await connection.ExecuteAsync(sql, new { Id = id, Name = name, Email = email, RoleId = roleId, IsActive = isActive });
            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM Users WHERE Id = @Id";
            var affectedRows = await connection.ExecuteAsync(sql, new { Id = id });
            return affectedRows > 0;
        }
    }
}