using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductAsync();
        Task<Product?> GetProductByIdAsync(int id);
        Task<int> CreateProductAsync(CreateProductDto dto);
        Task<bool> UpdateProductAsync(int id, UpdateProductDto dto);
        Task<bool> DeleteProductAsync(int id);
    }
}