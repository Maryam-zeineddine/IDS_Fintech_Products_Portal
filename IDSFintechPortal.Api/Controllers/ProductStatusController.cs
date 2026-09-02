using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ProductStatusController : ControllerBase
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public ProductStatusController(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            using var connection = _connectionFactory.CreateConnection();
            var statuses = await connection.QueryAsync("SELECT * FROM ProductStatus");
            return Ok(statuses);
        }
    }
}