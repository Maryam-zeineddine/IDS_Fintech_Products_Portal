using Microsoft.AspNetCore.Mvc;
using IDSFintechPortal.Api.DTOs;
using IDSFintechPortal.Api.Services;
using IDSFintechPortal.Api.Interfaces;

namespace IDSFintechPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IRoleRepository _roleRepository;
        private readonly JwtTokenGenerator _jwtTokenGenerator;

        public AuthController(IUserService userService, IRoleRepository roleRepository, JwtTokenGenerator jwtTokenGenerator)
        {
            _userService = userService;
            _roleRepository = roleRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userService.ValidateLoginAsync(dto);
            if (user is null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var role = await _roleRepository.GetByIdAsync(user.RoleId);
            var roleName = role?.Name ?? "Employee";

            var token = _jwtTokenGenerator.GenerateToken(user, roleName);

            return Ok(new 
            { 
                token,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    role = roleName
                } 
            });
        }
    }
}