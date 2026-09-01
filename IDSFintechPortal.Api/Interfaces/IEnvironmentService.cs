using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IEnvironmentService
    {
        Task<IEnumerable<DeploymentEnvironment>> GetAllEnvironmentsAsync();
        Task<DeploymentEnvironment?> GetEnvironmentByIdAsync(int id);
        Task<int> CreateEnvironmentAsync(CreateEnvironmentDto dto);
        Task<bool> UpdateEnvironmentAsync(int id, UpdateEnvironmentDto dto);
        Task<bool> DeleteEnvironmentAsync(int id);
    }
}