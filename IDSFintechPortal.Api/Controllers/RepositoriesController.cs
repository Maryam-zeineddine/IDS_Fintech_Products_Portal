using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class RepositoriesController : ControllerBase
    {
        private readonly IRepositoryService _repositoryService;

        public RepositoriesController(IRepositoryService repositoryService)
        {
            _repositoryService = repositoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRepositories()
        {
            var repositories = await _repositoryService.GetAllRepositoriesAsync();
            return Ok(repositories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRepositoryById(int id)
        {
            var repository = await _repositoryService.GetRepositoryByIdAsync(id);
            if (repository is null) return NotFound();
            return Ok(repository);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRepository([FromBody] CreateRepositoryDto dto)
        {
            var newId = await _repositoryService.CreateRepositoryAsync(dto);
            var created = await _repositoryService.GetRepositoryByIdAsync(newId);
            return CreatedAtAction(nameof(GetRepositoryById), new { id = newId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRepository(int id, [FromBody] UpdateRepositoryDto dto)
        {
            var success = await _repositoryService.UpdateRepositoryAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepository(int id)
        {
            var success = await _repositoryService.DeleteRepositoryAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}