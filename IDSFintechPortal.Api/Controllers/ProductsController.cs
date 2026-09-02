using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        //GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductAsync();
            return Ok(products);
        }

        //GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);

            if(product is null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        //POST: api/products
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto dto)
        {
            var newId = await _productService.CreateProductAsync(dto);
            var createdProduct = await _productService.GetProductByIdAsync(newId);
            return CreatedAtAction(nameof(GetProductById), new { id = newId }, createdProduct);
        }

        //PUT: api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDto dto)
        {
            var success = await _productService.UpdateProductAsync(id, dto);
            if(!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        //DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var success = await _productService.DeleteProductAsync(id);
            if(!success)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}