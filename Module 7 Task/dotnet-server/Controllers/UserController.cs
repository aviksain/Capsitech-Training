using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace TaskFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
  private readonly UserService _userService;

  private readonly JwtHelper _jwtHelper;

  public UserController(UserService userService, JwtHelper jwtHelper)
  {
    _userService = userService;
    _jwtHelper = jwtHelper;
  }

  private static string HashPassword(string password)
  {
    using var sha256 = SHA256.Create();
    return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
  }

  private static bool VerifyPassword(string rawPassword, string hashedPassword)
  {
    return HashPassword(rawPassword) == hashedPassword;
  }

  public class LoginDto
  {
    public required string Email { get; set; }
    public required string Password { get; set; }
  }

  [HttpPost("sign-up")]
  public async Task<IActionResult> SignUp([FromBody] User userInput)
  {
    try
    {
      if (string.IsNullOrWhiteSpace(userInput.Email) ||
          string.IsNullOrWhiteSpace(userInput.Fullname) ||
          string.IsNullOrWhiteSpace(userInput.Password))
      {
        return BadRequest("Email, Full Name, and Password are required.");
      }

      var existing = await _userService.GetByEmailAsync(userInput.Email);
      if (existing != null)
        return BadRequest("Email already in use");

      userInput.Email = userInput.Email.Trim().ToLower();
      userInput.Fullname = userInput.Fullname.Trim().ToLower();
      userInput.Password = HashPassword(userInput.Password);

      await _userService.CreateAsync(userInput);

      return Ok("User created successfully");
    }
    catch (System.Exception)
    {

      throw;
    }
  }

  [HttpPost("login")]
  public async Task<IActionResult> login([FromBody] LoginDto userInput)
  {
    try
    {
      if (string.IsNullOrWhiteSpace(userInput.Email) ||
          string.IsNullOrWhiteSpace(userInput.Password))
      {
        return BadRequest("Email and Password are required.");
      }

      var existingUser = await _userService.GetByEmailAsync(userInput.Email);

      if (existingUser == null || !VerifyPassword(userInput.Password, existingUser.Password))
      {
        return Unauthorized("Invalid credentials");
      }

      var token = _jwtHelper.GenerateJwtToken(existingUser);

      Response.Cookies.Append("accessToken", token, new CookieOptions
      {
        HttpOnly = true,
        Secure = true, // Set false for localhost without HTTPS
        SameSite = SameSiteMode.Strict,
        Expires = DateTime.UtcNow.AddHours(1)
      });

      var userResponse = new
      {
        existingUser.Id,
        existingUser.Email,
        existingUser.Fullname,
        existingUser.CreatedAt,
        existingUser.UpdatedAt
      };

      return Ok(userResponse);
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Server error: {ex.Message}");
    }
  }

  [HttpPost("logout")]
  public IActionResult logout()
  {
    Response.Cookies.Delete("accessToken");
    return Ok("Logged out");
  }

  [HttpGet("current-user")]
  public async Task<IActionResult> getCurrentUser()
  {
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    Console.Write("Current UserId: " + userId);

    if (string.IsNullOrEmpty(userId))
      return Unauthorized("No valid user ID found in token.");

    // Query user by ID (MongoDB or any DB)
    var user = await _userService.GetByIdAsync(userId);
    if (user == null)
      return Unauthorized("User not found.");

    return Ok(new
    {
      user.Id,
      user.Email,
      user.Fullname
    });
  }

}