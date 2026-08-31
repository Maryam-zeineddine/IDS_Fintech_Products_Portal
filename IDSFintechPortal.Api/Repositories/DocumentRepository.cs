using Dapper;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public DocumentRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Document>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Documents";
            return await connection.QueryAsync<Document>(sql);
        }

        public async Task<Document?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "SELECT * FROM Documents WHERE Id = @Id";
            return await connection.QuerySingleOrDefaultAsync<Document>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(CreateDocumentDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                INSERT INTO Documents 
                    (DocumentName, DocumentType, ProductId, Description, FileReference, LastUpdatedDate)
                VALUES 
                    (@DocumentName, @DocumentType, @ProductId, @Description, @FileReference, @LastUpdatedDate);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            return await connection.QuerySingleAsync<int>(sql, dto);
        }

        public async Task<bool> UpdateAsync(int id, UpdateDocumentDto dto)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = @"
                UPDATE Documents
                SET DocumentName = @DocumentName,
                    DocumentType = @DocumentType,
                    ProductId = @ProductId,
                    Description = @Description,
                    FileReference = @FileReference,
                    LastUpdatedDate = @LastUpdatedDate
                WHERE Id = @Id;";

            var parameters = new
            {
                Id = id,
                dto.DocumentName,
                dto.DocumentType,
                dto.ProductId,
                dto.Description,
                dto.FileReference,
                dto.LastUpdatedDate
            };

            var rowsAffected = await connection.ExecuteAsync(sql, parameters);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            const string sql = "DELETE FROM Documents WHERE Id = @Id;";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}