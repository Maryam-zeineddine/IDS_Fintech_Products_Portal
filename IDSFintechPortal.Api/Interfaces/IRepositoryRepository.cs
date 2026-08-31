using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IRepositoryRepository
    {
        Task<IEnumerable<Repository>> GetAllAsync();
        Task<Repository?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateRepositoryDto dto);
        Task<bool> UpdateAsync(int id, UpdateRepositoryDto dto);
        Task<bool> DeleteAsync(int id);
    }
}