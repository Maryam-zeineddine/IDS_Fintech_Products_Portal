using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeploymentModulesController : ControllerBase
    {
        private readonly IDeploymentModuleService _deploymentModuleService;

        public DeploymentModulesController(IDeploymentModuleService deploymentModuleService)
        {
            _deploymentModuleService = deploymentModuleService;
        }

        // GET: api/deploymentmodules/by-deployment/5
        [HttpGet("by-deployment/{deploymentId}")]
        public async Task<IActionResult> GetModulesForDeployment(int deploymentId)
        {
            var modules = await _deploymentModuleService.GetModulesForDeploymentAsync(deploymentId);
            return Ok(modules);
        }

        // POST: api/deploymentmodules
        [HttpPost]
        public async Task<IActionResult> AddModuleToDeployment([FromBody] CreateDeploymentModuleDto dto)
        {
            var newId = await _deploymentModuleService.AddModuleToDeploymentAsync(dto);
            return CreatedAtAction(nameof(GetModulesForDeployment), new { deploymentId = dto.DeploymentId }, new { id = newId });
        }

        // DELETE: api/deploymentmodules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveModuleFromDeployment(int id)
        {
            var success = await _deploymentModuleService.RemoveModuleFromDeploymentAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}