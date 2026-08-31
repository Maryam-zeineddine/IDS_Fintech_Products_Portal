using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class TeamMemberService : ITeamMemberService
    {
        private readonly ITeamMemberRepository _teamMemberRepository;

        public TeamMemberService(ITeamMemberRepository teamMemberRepository)
        {
            _teamMemberRepository = teamMemberRepository;
        }

        public async Task<IEnumerable<TeamMember>> GetAllTeamMembersAsync()
            => await _teamMemberRepository.GetAllAsync();

        public async Task<TeamMember?> GetTeamMemberByIdAsync(int id)
            => await _teamMemberRepository.GetByIdAsync(id);

        public async Task<int> CreateTeamMemberAsync(CreateTeamMemberDto dto)
            => await _teamMemberRepository.CreateAsync(dto);

        public async Task<bool> UpdateTeamMemberAsync(int id, UpdateTeamMemberDto dto)
            => await _teamMemberRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteTeamMemberAsync(int id)
            => await _teamMemberRepository.DeleteAsync(id);
    }
}