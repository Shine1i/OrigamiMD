namespace GrazieBackend.Models;

public class BackendGrazieRequest
{
    public BackendGrazieRequestType ReqType { get; }
    public string Prompt { get; }
}