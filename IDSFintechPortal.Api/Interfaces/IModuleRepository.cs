using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IModuleRepository
    {
        Task<IEnumerable<Module>> GetAllAsync();
        Task<Module?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateModuleDto dto);
        Task<bool> UpdateAsync(int id, UpdateModuleDto dto);
        Task<bool> DeleteAsync(int id);
    }
}