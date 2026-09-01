using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Interfaces;
using IDSFintechPortal.Api.Models;

namespace IDSFintechPortal.Api.Services
{
    public class ProductResponsibilityService : IProductResponsibilityService
    {
        private readonly IProductResponsibilityRepository _productResponsibilityRepository;

        public ProductResponsibilityService(IProductResponsibilityRepository productResponsibilityRepository)
        {
            _productResponsibilityRepository = productResponsibilityRepository;
        }

        public async Task<IEnumerable<ProductResponsibility>> GetAllProductResponsibilitiesAsync()
            => await _productResponsibilityRepository.GetAllAsync();

        public async Task<ProductResponsibility?> GetProductResponsibilityByIdAsync(int id)
            => await _productResponsibilityRepository.GetByIdAsync(id);

        public async Task<int> CreateProductResponsibilityAsync(CreateProductResponsibilityDto dto)
            => await _productResponsibilityRepository.CreateAsync(dto);

        public async Task<bool> UpdateProductResponsibilityAsync(int id, UpdateProductResponsibilityDto dto)
            => await _productResponsibilityRepository.UpdateAsync(id, dto);

        public async Task<bool> DeleteProductResponsibilityAsync(int id)
            => await _productResponsibilityRepository.DeleteAsync(id);
    }
}