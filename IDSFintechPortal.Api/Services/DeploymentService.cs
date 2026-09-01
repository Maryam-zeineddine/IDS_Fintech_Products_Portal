using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class DeploymentService : IDeploymentService
    {
        private readonly IDeploymentRepository _deploymentRepository;

        public DeploymentService(IDeploymentRepository deploymentRepository)
        {
            _deploymentRepository = deploymentRepository;
        }

        public async Task<IEnumerable<Deployment>> GetAllDeploymentsAsync()
            => await _deploymentRepository.GetAllAsync();

        public async Task<Deployment?> GetDeploymentByIdAsync(int id)
            => await _deploymentRepository.GetByIdAsync(id);

        public async Task<int> CreateDeploymentAsync(CreateDeploymentDto dto)
            => await _deploymentRepository.CreateAsync(dto);

        public async Task<bool> UpdateDeploymentAsync(int id, UpdateDeploymentDto dto)
            => await _deploymentRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteDeploymentAsync(int id)
            => await _deploymentRepository.DeleteAsync(id);
    }
}