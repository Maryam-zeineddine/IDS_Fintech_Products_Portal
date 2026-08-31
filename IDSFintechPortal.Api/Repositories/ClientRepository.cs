using System.Data;
using Dapper;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public ClientRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Clients";
            return await connection.QueryAsync<Client>(sql);
        }

        public async Task<Client?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Clients WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<Client>(sql, new{Id = id});
        }

        public async Task<int> CreateAsync(CreateClientDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT  INTO Clients
                    (CompanyName, Country, ContactInfo, ClientStatusId, Notes)
                VALUES
                    (@CompanyName, @Country, @ContactInfo, @ClientStatusId, @Notes);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateClientDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE Clients
                SET CompanyName = @CompanyName,
                    Country = @Country,
                    ContactInfo = @ContactInfo,
                    ClientStatusId = @ClientStatusId,
                    Notes = @Notes
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.CompanyName,
                dto.Country,
                dto.ContactInfo,
                dto.ClientStatusId,
                dto.Notes
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM Clients WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}