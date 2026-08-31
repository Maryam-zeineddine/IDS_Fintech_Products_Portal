using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<Document>> GetAllAsync();
        Task<Document?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateDocumentDto dto);
        Task<bool> UpdateAsync(int id, UpdateDocumentDto dto);
        Task<bool> DeleteAsync(int id);
    }
}