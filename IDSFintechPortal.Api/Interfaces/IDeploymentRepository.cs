using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IDeploymentRepository
    {
        Task<IEnumerable<Deployment>> GetAllAsync();
        Task<Deployment?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateDeploymentDto dto);
        Task<bool> UpdateAsync(int id, UpdateDeploymentDto dto);
        Task<bool> DeleteAsync(int id);
    }
}