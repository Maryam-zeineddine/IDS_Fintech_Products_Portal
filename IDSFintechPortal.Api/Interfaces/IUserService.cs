using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<int> CreateUserAsync(CreateUserDto dto);
        Task<bool> UpdateUserAsync(int id, UpdateUserDto dto);
        Task<bool> DeleteUserAsync(int id);
        Task<User?> ValidateLoginAsync(LoginDto dto);
    }
}