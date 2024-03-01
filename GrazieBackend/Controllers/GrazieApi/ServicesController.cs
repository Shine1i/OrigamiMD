using GrazieBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace GrazieBackend.Controllers.GrazieApi;

[Route("grazie-backend/services")]
public class ServicesController : ControllerBase
{
    [HttpPost("grazie")]
    public ActionResult PromptGrazie(BackendRequest request)
    {
        return new NotFoundResult();
    }
}