using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeploymentsController : ControllerBase
    {
        private readonly IDeploymentService _deploymentService;

        public DeploymentsController(IDeploymentService deploymentService)
        {
            _deploymentService = deploymentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDeployments()
        {
            var deployments = await _deploymentService.GetAllDeploymentsAsync();
            return Ok(deployments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeploymentById(int id)
        {
            var deployment = await _deploymentService.GetDeploymentByIdAsync(id);
            if (deployment is null) return NotFound();
            return Ok(deployment);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDeployment([FromBody] CreateDeploymentDto dto)
        {
            var newId = await _deploymentService.CreateDeploymentAsync(dto);
            var created = await _deploymentService.GetDeploymentByIdAsync(newId);
            return CreatedAtAction(nameof(GetDeploymentById), new { id = newId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeployment(int id, [FromBody] UpdateDeploymentDto dto)
        {
            var success = await _deploymentService.UpdateDeploymentAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeployment(int id)
        {
            var success = await _deploymentService.DeleteDeploymentAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}