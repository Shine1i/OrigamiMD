using GrazieBackend.Models;

namespace GrazieBackend.Services;

public class GrazieBackendRequestToGrazieMessagesStrategy
{
    public IList<GrazieMessage> Convert(BackendGrazieRequest request)
    {
        var messages = new List<GrazieMessage>();
        
        switch (request.ReqType)
        {
            case BackendGrazieRequestType.AdjustTone:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Adjust the tone of the statement"));
                break;
            case BackendGrazieRequestType.Complete:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Complete the statement"));
                break;
            case BackendGrazieRequestType.Emojify:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Emojify the statement"));
                break;
            case BackendGrazieRequestType.DeEmojify:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "De-emojify the statement"));
                break;
            case BackendGrazieRequestType.Extend:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Extend the statement"));
                break;
            case BackendGrazieRequestType.FixGrammar:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Fix the grammar of the statement"));
                break;
            case BackendGrazieRequestType.Prompt:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Reply to the message"));
                break;
            case BackendGrazieRequestType.Rephrase:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Rephrase the statement"));
                break;
            case BackendGrazieRequestType.Summarize:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Summarize the statement"));
                break;
            case BackendGrazieRequestType.Eli5:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Explain the statement like I'm 5 years old"));
                break;
            case BackendGrazieRequestType.Translate:
                messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, "Translate the statement"));
                break;
            default:
                throw new NotImplementedException();
        }

        foreach (var msg in request.SystemConfigurationMessages)
            messages.Add(new GrazieMessage(GrazieMessage.SystemMessage, msg));
        
        messages.Add(new GrazieMessage(GrazieMessage.UserMessage, request.Prompt));

        return messages;
    }
}