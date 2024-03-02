using System.Text;
using System.Text.Json;
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
            prompt = "",
            profile = "openai-gpt-4"
        });

        var result = await httpClient.SendAsync(req, HttpCompletionOption.ResponseHeadersRead);
        var contentStream = await result.Content.ReadAsStreamAsync();

        var sb = new StringBuilder();
        using var reader = new StreamReader(contentStream);
        while (!reader.EndOfStream)
        {
            var line = await reader.ReadLineAsync();
            line = line.Replace("data: ", "");
            
            if (line is not { Length: > 0 })
                continue;
            
            var jsonObject = JsonSerializer.Deserialize<Response>(line);

            if (jsonObject.type != "Content")
                break;

            sb.Append(jsonObject.content);
        }

        return sb.ToString();
    }
    
    public bool TestKey()
    {
        throw new NotImplementedException();
    }
    
    private sealed record Response(
        // ReSharper disable InconsistentNaming
        string type,
        string event_type,
        string content
        // ReSharper restore InconsistentNaming
    );
}