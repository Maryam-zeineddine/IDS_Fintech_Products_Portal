using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IProductResponsibilityService
    {
        Task<IEnumerable<ProductResponsibility>> GetAllProductResponsibilitiesAsync();
        Task<ProductResponsibility?> GetProductResponsibilityByIdAsync(int id);
        Task<int> CreateProductResponsibilityAsync(CreateProductResponsibilityDto dto);
        Task<bool> UpdateProductResponsibilityAsync(int id, UpdateProductResponsibilityDto dto);
        Task<bool> DeleteProductResponsibilityAsync(int id);
    }
}