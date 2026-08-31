using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetAllProductAsync()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _productRepository.GetByIdAsync(id);
        }

        public async Task<int> CreateProductAsync(CreateProductDto dto)
        {
            return await _productRepository.CreateAsync(dto);
        }

        public async Task<bool> UpdateProductAsync(int id, UpdateProductDto dto)
        {
            return await _productRepository.UpdateAsync(id, dto);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            return await _productRepository.DeleteAsync(id);
        }
    }
}