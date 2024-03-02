using GrazieBackend.Models;
using GrazieBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GrazieBackend.Controllers;

[Route("grazie-backend/[controller]")]
[ApiController]
public class ServicesController(GrazieService grazieService, GrazieRequestTypeToGrazieMessageStrategy converterStrategy) : ControllerBase
{
    // TODO: accept a list of BackendGrazieRequests with the first one being the sys msg and the rest being additional messages for configuration <|> AWAITING TEST
    [HttpPost("grazie")]
    public async Task<ActionResult> PromptGrazie(BackendGrazieRequest request)
    {
        // TODO: Catch NotImplementedException if strategy conversion fails from bad request type
        var sysMsg = converterStrategy.Convert(request);
        List<GrazieMessage> userMsg = new List<GrazieMessage>();
        foreach (var item in request.Prompt)
        {
            userMsg.Add(new GrazieMessage(GrazieMessage.UserMessage, item));
        }

        //var messages = new[] { sysMsg, userMsg[0] }; FUCK THIS, it's dogshit
        userMsg.Insert(0, sysMsg);
        
        var response = await grazieService.PromptAi(userMsg);

        var result = new ContentResult
        {
            Content = response
        };

        return result;
    }
}