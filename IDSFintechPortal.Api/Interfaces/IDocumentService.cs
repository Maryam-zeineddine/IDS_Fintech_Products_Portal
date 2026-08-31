using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IDocumentService
    {
        Task<IEnumerable<Document>> GetAllDocumentsAsync();
        Task<Document?> GetDocumentByIdAsync(int id);
        Task<int> CreateDocumentAsync(CreateDocumentDto dto);
        Task<bool> UpdateDocumentAsync(int id, UpdateDocumentDto dto);
        Task<bool> DeleteDocumentAsync(int id);
    }
}