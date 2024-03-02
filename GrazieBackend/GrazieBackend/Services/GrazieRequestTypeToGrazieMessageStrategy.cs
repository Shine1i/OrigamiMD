using GrazieBackend.Models;

namespace GrazieBackend.Services;

public class GrazieRequestTypeToGrazieMessageStrategy
{
    public GrazieMessage Convert(BackendGrazieRequest request)
    {
        switch (request.ReqType)
        {
            case BackendGrazieRequestType.AdjustTone:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Adjust the tone of the statement");
            case BackendGrazieRequestType.Complete:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Complete the statement");
            case BackendGrazieRequestType.Emojify:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Emojify the statement");
            case BackendGrazieRequestType.DeEmojify:
                return new GrazieMessage(GrazieMessage.SystemMessage, "De-emojify the statement");
            case BackendGrazieRequestType.Extend:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Extend the statement");
            case BackendGrazieRequestType.FixGrammar:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Fix the grammar of the statement");
            case BackendGrazieRequestType.Prompt:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Reply to the message");
            case BackendGrazieRequestType.Rephrase:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Rephrase the statement");
            case BackendGrazieRequestType.Summarize:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Summarize the statement");
            case BackendGrazieRequestType.Eli5:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Explain the statement like I'm 5 years old");
            case BackendGrazieRequestType.Translate:
                return new GrazieMessage(GrazieMessage.SystemMessage, "Translate the statement");
            default:
                throw new NotImplementedException();
        }
    }
}