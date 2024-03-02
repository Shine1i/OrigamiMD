using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GrazieBackend.Models;

public class BackendGrazieRequest
{
    [Required]
    [JsonPropertyName("requestType")]
    public BackendGrazieRequestType ReqType { get; set; }
    [Required]
    [JsonPropertyName("prompt")]
    public List<string> Prompt { get; set; }
}