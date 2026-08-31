using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IRepositoryService
    {
        Task<IEnumerable<Repository>> GetAllRepositoriesAsync();
        Task<Repository?> GetRepositoryByIdAsync(int id);
        Task<int> CreateRepositoryAsync(CreateRepositoryDto dto);
        Task<bool> UpdateRepositoryAsync(int id, UpdateRepositoryDto dto);
        Task<bool> DeleteRepositoryAsync(int id);
    }
}