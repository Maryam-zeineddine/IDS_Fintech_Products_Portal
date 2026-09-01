using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class DeploymentModuleService : IDeploymentModuleService
    {
        private readonly IDeploymentModuleRepository _deploymentModuleRepository;

        public DeploymentModuleService(IDeploymentModuleRepository deploymentModuleRepository)
        {
            _deploymentModuleRepository = deploymentModuleRepository;
        }

        public async Task<IEnumerable<DeploymentModule>> GetModulesForDeploymentAsync(int deploymentId)
            => await _deploymentModuleRepository.GetByDeploymentIdAsync(deploymentId);

        public async Task<int> AddModuleToDeploymentAsync(CreateDeploymentModuleDto dto)
            => await _deploymentModuleRepository.CreateAsync(dto);

        public async Task<bool> RemoveModuleFromDeploymentAsync(int id)
            => await _deploymentModuleRepository.DeleteAsync(id);
    }
}