using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using IDSFintechPortal.Api.Controllers;
using System.Data.Common;
using System.Data;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class DeploymentStatusController : ControllerBase
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public DeploymentStatusController(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            using var connection = _connectionFactory.CreateConnection();
            var statuses = await connection.QueryAsync("SELECT * FROM DeploymentStatus");
            return Ok(statuses);
        }
    }
}