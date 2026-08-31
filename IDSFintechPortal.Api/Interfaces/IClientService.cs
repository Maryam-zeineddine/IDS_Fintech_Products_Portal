using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAllClientsAsync();
        Task<Client?> GetClientByIdAsync(int id);
        Task<int> CreateClientAsync(CreateClientDto dto);
        Task<bool> UpdateClientAsync(int id, UpdateClientDto dto);
        Task<bool> DeleteClientAsync(int id);
    }
}