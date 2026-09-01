using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModulesController : ControllerBase
    {
        private readonly IModuleService _moduleService;

        public ModulesController(IModuleService moduleService)
        {
            _moduleService = moduleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllModules()
        {
            var modules = await _moduleService.GetAllModulesAsync();
            return Ok(modules);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetModuleById(int id)
        {
            var module = await _moduleService.GetModuleByIdAsync(id);
            if (module is null) return NotFound();
            return Ok(module);
        }

        [HttpPost]
        public async Task<IActionResult> CreateModule([FromBody] CreateModuleDto dto)
        {
            var newId = await _moduleService.CreateModuleAsync(dto);
            var created = await _moduleService.GetModuleByIdAsync(newId);
            return CreatedAtAction(nameof(GetModuleById), new { id = newId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModule(int id, [FromBody] UpdateModuleDto dto)
        {
            var success = await _moduleService.UpdateModuleAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModule(int id)
        {
            var success = await _moduleService.DeleteModuleAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}