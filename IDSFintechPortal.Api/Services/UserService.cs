using BCrypt.Net;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;
using IDSFintechPortal.Api.DTOs;

namespace IDSFintechPortal.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }   

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(MapToDto);
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user is null ? null : MapToDto(user);
        }

        public async Task<int> CreateUserAsync(CreateUserDto dto)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            return await _userRepository.CreateAsync(dto.Name, dto.Email, passwordHash, dto.RoleId);
        }

        public async Task<bool> UpdateUserAsync(int id, UpdateUserDto dto)
        {
            return await _userRepository.UpdateAsync(id, dto.Name, dto.Email, dto.RoleId, dto.IsActive);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.DeleteAsync(id);
        }

        public async Task<User?> ValidateLoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user is null || !user.IsActive)
            {
                return null;
            }

            var passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            
            return passwordValid ? user : null;
        }

        private static UserDto MapToDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                RoleId = user.RoleId,
                IsActive = user.IsActive
            };
        }

    }
}