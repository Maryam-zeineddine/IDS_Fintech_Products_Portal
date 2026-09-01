using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IDeploymentModuleRepository
    {
        Task<IEnumerable<DeploymentModule>> GetByDeploymentIdAsync(int deploymentId);
        Task<int> CreateAsync(CreateDeploymentModuleDto dto);
        Task<bool> DeleteAsync(int id);
    }
}