using System.Runtime.CompilerServices;

namespace GrazieBackend.Services;

public class GrazieAuthKeyProvider : IAuthKeyProvider
{
    private static readonly string[] EnvVars = ["Grazie-Auth-Application-JWT", "GRAZIE_JWT_TOKEN"];
    
    private readonly Lazy<string> _key = new(() =>
    {
        // TODO: safer implementation
        var key = EnvVars.Select(Environment.GetEnvironmentVariable)
            .FirstOrDefault(key => key != null);

        if (key == null)
            throw new ApplicationException
                ($"No Grazie key. please set one as environment variable with {string.Join("/", EnvVars)}");
        
        return key;
    });

    public string GetKey() => _key.Value;
}