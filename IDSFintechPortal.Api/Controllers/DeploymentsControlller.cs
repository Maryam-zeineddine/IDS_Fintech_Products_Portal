using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Authorize]
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
            try
            {
                var success = await _deploymentService.DeleteDeploymentAsync(id);
                if (!success) return NotFound();
                return NoContent();
            }
            catch (Microsoft.Data.SqlClient.SqlException ex) when (ex.Number == 547)
            {
                return Conflict(new { message = "This deployment has linked modules or environments and cannot be deleted. Remove them first." });
            }
        }
    }
}