using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GrazieBackend.Models;

// TODO: Add system msg list and user msg list for further customizability
public class BackendGrazieRequest
{
    [Required]
    [JsonPropertyName("requestType")]
    public BackendGrazieRequestType ReqType { get; set; }
    [Required]
    [JsonPropertyName("prompt")]
    public string Prompt { get; set; }
}