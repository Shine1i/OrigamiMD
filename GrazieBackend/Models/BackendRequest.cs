namespace GrazieBackend.Models;

public class BackendRequest
{
    public BackendRequestType ReqType { get; }
    public string Prompt { get; }
}