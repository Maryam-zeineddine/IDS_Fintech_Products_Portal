using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class EnvironmentService : IEnvironmentService
    {
        private readonly IEnvironmentRepository _environmentRepository;

        public EnvironmentService(IEnvironmentRepository environmentRepository)
        {
            _environmentRepository = environmentRepository;
        }

        public async Task<IEnumerable<DeploymentEnvironment>> GetAllEnvironmentsAsync()
            => await _environmentRepository.GetAllAsync();

        public async Task<DeploymentEnvironment?> GetEnvironmentByIdAsync(int id)
            => await _environmentRepository.GetByIdAsync(id);

        public async Task<int> CreateEnvironmentAsync(CreateEnvironmentDto dto)
            => await _environmentRepository.CreateAsync(dto);

        public async Task<bool> UpdateEnvironmentAsync(int id, UpdateEnvironmentDto dto)
            => await _environmentRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteEnvironmentAsync(int id)
            => await _environmentRepository.DeleteAsync(id);
    }
}