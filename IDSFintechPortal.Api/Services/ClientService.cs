using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;

        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
            => await _clientRepository.GetAllAsync();

        public async Task<Client?> GetClientByIdAsync(int id)
            => await _clientRepository.GetByIdAsync(id);

        public async Task<int> CreateClientAsync(CreateClientDto dto)
            => await _clientRepository.CreateAsync(dto);

        public async Task<bool> UpdateClientAsync(int id, UpdateClientDto dto)
            => await _clientRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteClientAsync(int id)
            => await _clientRepository.DeleteAsync(id);
    }
}