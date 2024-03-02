using Microsoft.AspNetCore.Mvc;

namespace GrazieBackend.Controllers;

[Route("grazie-backend/app-manager")]
[ApiController]
public class AppManagementController : ControllerBase
{
    [HttpGet("shutdown")]
    public void ShutdownBackend()
    {
        throw new NotImplementedException();
    }
}