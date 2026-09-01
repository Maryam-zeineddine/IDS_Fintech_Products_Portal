using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class ModuleService : IModuleService
    {
        private readonly IModuleRepository _moduleRepository;

        public ModuleService(IModuleRepository moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }

        public async Task<IEnumerable<Module>> GetAllModulesAsync()
            => await _moduleRepository.GetAllAsync();

        public async Task<Module?> GetModuleByIdAsync(int id)
            => await _moduleRepository.GetByIdAsync(id);

        public async Task<int> CreateModuleAsync(CreateModuleDto dto)
            => await _moduleRepository.CreateAsync(dto);

        public async Task<bool> UpdateModuleAsync(int id, UpdateModuleDto dto)
            => await _moduleRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteModuleAsync(int id)
            => await _moduleRepository.DeleteAsync(id);
    }
}