using GrazieBackend.Models;
using GrazieBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GrazieBackend.Controllers;

[Route("grazie-backend/[controller]")]
[ApiController]
public class ServicesController(GrazieService grazieService) : ControllerBase
{
    [HttpPost("grazie")]
    public async Task<ActionResult> PromptGrazie(BackendRequest request)
    {
        throw new NotImplementedException();
    }
}