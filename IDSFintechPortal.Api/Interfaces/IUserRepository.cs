using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task<int> CreateAsync(string name, string email, string passwordHash, int roleId);
        Task<bool> UpdateAsync(int id, string name, string email, int roleId, bool isActive);
        Task<bool> DeleteAsync(int id);
    }
}

