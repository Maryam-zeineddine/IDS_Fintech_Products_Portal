using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ProductResponsibilitiesController : ControllerBase
    {
        private readonly IProductResponsibilityService _productResponsibilityService;

        public ProductResponsibilitiesController(IProductResponsibilityService productResponsibilityService)
        {
            _productResponsibilityService = productResponsibilityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductResponsibilities()
        {
            var items = await _productResponsibilityService.GetAllProductResponsibilitiesAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductResponsibilityById(int id)
        {
            var item = await _productResponsibilityService.GetProductResponsibilityByIdAsync(id);
            if (item is null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductResponsibility([FromBody] CreateProductResponsibilityDto dto)
        {
            var newId = await _productResponsibilityService.CreateProductResponsibilityAsync(dto);
            var created = await _productResponsibilityService.GetProductResponsibilityByIdAsync(newId);
            return CreatedAtAction(nameof(GetProductResponsibilityById), new { id = newId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductResponsibility(int id, [FromBody] UpdateProductResponsibilityDto dto)
        {
            var success = await _productResponsibilityService.UpdateProductResponsibilityAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductResponsibility(int id)
        {
            var success = await _productResponsibilityService.DeleteProductResponsibilityAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}