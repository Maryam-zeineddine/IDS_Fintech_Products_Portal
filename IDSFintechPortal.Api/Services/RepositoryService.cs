using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class RepositoryService : IRepositoryService
    {
        private readonly IRepositoryRepository _repositoryRepository;

        public RepositoryService(IRepositoryRepository repositoryRepository)
        {
            _repositoryRepository = repositoryRepository;
        }

        public async Task<IEnumerable<Repository>> GetAllRepositoriesAsync()
            => await _repositoryRepository.GetAllAsync();

        public async Task<Repository?> GetRepositoryByIdAsync(int id)
            => await _repositoryRepository.GetByIdAsync(id);

        public async Task<int> CreateRepositoryAsync(CreateRepositoryDto dto)
            => await _repositoryRepository.CreateAsync(dto);

        public async Task<bool> UpdateRepositoryAsync(int id, UpdateRepositoryDto dto)
            => await _repositoryRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteRepositoryAsync(int id)
            => await _repositoryRepository.DeleteAsync(id);
    }
}