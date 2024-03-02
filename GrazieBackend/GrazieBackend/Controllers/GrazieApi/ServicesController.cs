using GrazieBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace GrazieBackend.Controllers.GrazieApi;

[Route("grazie-backend/services")]
[ApiController]
public class ServicesController : ControllerBase
{
    [HttpPost("grazie")]
    public ActionResult PromptGrazie(BackendRequest request)
    {
        throw new NotImplementedException();
    }
}