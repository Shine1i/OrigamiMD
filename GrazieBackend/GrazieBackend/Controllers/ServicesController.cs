﻿using GrazieBackend.Models;
using GrazieBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GrazieBackend.Controllers;

[Route("grazie-backend/[controller]")]
[ApiController]
public class ServicesController(GrazieService grazieService, GrazieRequestTypeToGrazieMessageStrategy converterStrategy) : ControllerBase
{
    // TODO: accept a list of BackendGrazieRequests with the first one being the sys msg and the rest being additional messages for configuration
    [HttpPost("grazie")]
    public async Task<ActionResult> PromptGrazie(BackendGrazieRequest request)
    {
        // TODO: Catch NotImplementedException if strategy conversion fails from bad request type
        var sysMsg = converterStrategy.Convert(request);
        var userMsg = new GrazieMessage(GrazieMessage.UserMessage, request.Prompt);
        var messages = new[] { sysMsg, userMsg };
        
        var response = await grazieService.PromptAi(messages);

        var result = new ContentResult
        {
            Content = response
        };

        return result;
    }
}