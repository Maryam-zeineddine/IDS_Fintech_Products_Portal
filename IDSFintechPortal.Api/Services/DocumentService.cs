using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;

        public DocumentService(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public async Task<IEnumerable<Document>> GetAllDocumentsAsync()
            => await _documentRepository.GetAllAsync();

        public async Task<Document?> GetDocumentByIdAsync(int id)
            => await _documentRepository.GetByIdAsync(id);

        public async Task<int> CreateDocumentAsync(CreateDocumentDto dto)
            => await _documentRepository.CreateAsync(dto);

        public async Task<bool> UpdateDocumentAsync(int id, UpdateDocumentDto dto)
            => await _documentRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteDocumentAsync(int id)
            => await _documentRepository.DeleteAsync(id);
    }
}