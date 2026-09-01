using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnvironmentsController : ControllerBase
    {
        private readonly IEnvironmentService _environmentService;

        public EnvironmentsController(IEnvironmentService environmentService)
        {
            _environmentService = environmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEnvironments()
        {
            var environments = await _environmentService.GetAllEnvironmentsAsync();
            return Ok(environments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEnvironmentById(int id)
        {
            var environment = await _environmentService.GetEnvironmentByIdAsync(id);
            if (environment is null) return NotFound();
            return Ok(environment);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEnvironment([FromBody] CreateEnvironmentDto dto)
        {
            var newId = await _environmentService.CreateEnvironmentAsync(dto);
            var created = await _environmentService.GetEnvironmentByIdAsync(newId);
            return CreatedAtAction(nameof(GetEnvironmentById), new { id = newId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEnvironment(int id, [FromBody] UpdateEnvironmentDto dto)
        {
            var success = await _environmentService.UpdateEnvironmentAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnvironment(int id)
        {
            var success = await _environmentService.DeleteEnvironmentAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}