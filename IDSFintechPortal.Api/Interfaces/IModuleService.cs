using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IModuleService
    {
        Task<IEnumerable<Module>> GetAllModulesAsync();
        Task<Module?> GetModuleByIdAsync(int id);
        Task<int> CreateModuleAsync(CreateModuleDto dto);
        Task<bool> UpdateModuleAsync(int id, UpdateModuleDto dto);
        Task<bool> DeleteModuleAsync(int id);
    }
}