using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateProductDto dto);
        Task<bool> UpdateAsync(int id, UpdateProductDto dto);
        Task<bool> DeleteAsync(int id);
    }
}