using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IEnvironmentRepository
    {
        Task<IEnumerable<DeploymentEnvironment>> GetAllAsync();
        Task<DeploymentEnvironment?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateEnvironmentDto dto);
        Task<bool> UpdateAsync(int id, UpdateEnvironmentDto dto);
        Task<bool> DeleteAsync(int id);
    }
}