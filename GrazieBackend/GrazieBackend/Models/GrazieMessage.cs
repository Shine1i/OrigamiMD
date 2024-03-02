using System.Text.Json.Serialization;

namespace GrazieBackend.Models;

public record GrazieMessage
{
    public const string SystemMessage = "system_message";
    public const string UserMessage = "user_message";

    [JsonPropertyName("type")]
    public string Type { get; }
    [JsonPropertyName("content")]
    public string Content { get; }
}