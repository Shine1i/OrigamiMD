using GrazieBackend.Models;

namespace GrazieBackend.Services;

public class GrazieService(GrazieAuthKeyProvider keyProvider, HttpClient httpClient)
{
    private const string DnsZone = "https://api.app.prod.grazie.aws.intellij.net";
    
    public async Task<string> PromptAi(IList<GrazieMessage> messages)
    {

        var req = new HttpRequestMessage(HttpMethod.Post, $"{DnsZone}/user/v5/llm/chat/stream/v6");
        req.Headers.Add("grazie-authenticate-jwt", keyProvider.GetKey());
        req.Content = JsonContent.Create(new
        {
            chat = new
            {
                messages
            },
            prompt = "unknown",
            profile = "openai-gpt-4"
        });

        var result = await httpClient.SendAsync(req);
        return await result.Content.ReadAsStringAsync();
    }
    
    public bool TestKey()
    {
        throw new NotImplementedException();
    }
}