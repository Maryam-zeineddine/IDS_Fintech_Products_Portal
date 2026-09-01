using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IDeploymentModuleService
    {
        Task<IEnumerable<DeploymentModule>> GetModulesForDeploymentAsync(int deploymentId);
        Task<int> AddModuleToDeploymentAsync(CreateDeploymentModuleDto dto);
        Task<bool> RemoveModuleFromDeploymentAsync(int id);
    }
}