namespace GrazieBackend.Controllers.GrazieApi;

public class ConfigurationCache : IConfigurationCache
{
    public Response rsp { get; set; }
    
    public ConfigurationCache()
    {
        rsp = new Response();
    }
}

public interface IConfigurationCache
{
    Response
}