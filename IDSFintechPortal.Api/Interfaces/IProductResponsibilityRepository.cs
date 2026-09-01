using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IProductResponsibilityRepository
    {
        Task<IEnumerable<ProductResponsibility>> GetAllAsync();
        Task<ProductResponsibility?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateProductResponsibilityDto dto);
        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateAsync(int id, UpdateProductResponsibilityDto dto);
    }
}