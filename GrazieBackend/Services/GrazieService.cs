namespace GrazieBackend.Services;

public class GrazieService(GrazieAuthKeyProvider keyProvider) : IAiService
{
    private string _key = keyProvider.GetKey();
    
    public string PromptAi(string prompt)
    {
        throw new NotImplementedException();
    }
}