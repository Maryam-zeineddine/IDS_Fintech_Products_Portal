using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface ITeamMemberRepository
    {
        Task<IEnumerable<TeamMember>> GetAllAsync();
        Task<TeamMember?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateTeamMemberDto dto);
        Task<bool> UpdateAsync(int id, UpdateTeamMemberDto dto);
        Task<bool> DeleteAsync(int id);
    }
}