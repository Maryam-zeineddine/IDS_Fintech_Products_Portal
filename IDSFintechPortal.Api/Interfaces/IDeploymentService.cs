using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IDeploymentService
    {
        Task<IEnumerable<Deployment>> GetAllDeploymentsAsync();
        Task<Deployment?> GetDeploymentByIdAsync(int id);
        Task<int> CreateDeploymentAsync(CreateDeploymentDto dto);
        Task<bool> UpdateDeploymentAsync(int id, UpdateDeploymentDto dto);
        Task<bool> DeleteDeploymentAsync(int id);
    }
}