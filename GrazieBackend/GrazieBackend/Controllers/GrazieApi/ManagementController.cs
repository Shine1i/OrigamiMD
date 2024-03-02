using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;

namespace GrazieBackend.Controllers.GrazieApi;

[Route("grazie-backend/manager")]
[ApiController]
public class ManagementController : ControllerBase
{
    [HttpGet("shutdown")]
    public void ShutdownBackend()
    {
        throw new NotImplementedException();
    }
}