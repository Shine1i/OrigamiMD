using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GrazieBackend.Models;

public class BackendGrazieRequest
{
    [Required]
    [JsonPropertyName("requestType")]
    public BackendGrazieRequestType ReqType { get; set; }
    
    [Required]
    [JsonPropertyName("sysCfgMsgs")]
    public string[] SystemConfigurationMessages { get; set; }
    
    [Required]
    [JsonPropertyName("prompt")]
    public string Prompt { get; set; }
}