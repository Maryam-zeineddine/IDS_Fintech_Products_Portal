using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface ITeamMemberService
    {
        Task<IEnumerable<TeamMember>> GetAllTeamMembersAsync();
        Task<TeamMember?> GetTeamMemberByIdAsync(int id);
        Task<int> CreateTeamMemberAsync(CreateTeamMemberDto dto);
        Task<bool> UpdateTeamMemberAsync(int id, UpdateTeamMemberDto dto);
        Task<bool> DeleteTeamMemberAsync(int id);
    }
}