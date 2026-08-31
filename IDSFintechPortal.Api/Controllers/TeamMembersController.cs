using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamMembersController : ControllerBase
    {
        private readonly ITeamMemberService _teamMemberService;

        public TeamMembersController(ITeamMemberService teamMemberService)
        {
            _teamMemberService = teamMemberService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTeamMembers()
        {
            var teamMembers = await _teamMemberService.GetAllTeamMembersAsync();
            return Ok(teamMembers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamMemberById(int id)
        {
            var teamMember = await _teamMemberService.GetTeamMemberByIdAsync(id);
            if (teamMember is null) return NotFound();
            return Ok(teamMember);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeamMember([FromBody] CreateTeamMemberDto dto)
        {
            var newId = await _teamMemberService.CreateTeamMemberAsync(dto);
            var created = await _teamMemberService.GetTeamMemberByIdAsync(newId);
            return CreatedAtAction(nameof(GetTeamMemberById), new { id = newId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeamMember(int id, [FromBody] UpdateTeamMemberDto dto)
        {
            var success = await _teamMemberService.UpdateTeamMemberAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamMember(int id)
        {
            var success = await _teamMemberService.DeleteTeamMemberAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}