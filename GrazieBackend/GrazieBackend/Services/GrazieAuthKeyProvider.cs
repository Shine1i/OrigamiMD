using System.Runtime.CompilerServices;

namespace GrazieBackend.Services;

public class GrazieAuthKeyProvider : IAuthKeyProvider
{
    private readonly Lazy<string> _key = new(() =>
    {
        // TODO: safer implementation
        var key = Environment.GetEnvironmentVariable("Grazie-Auth-Application-JWT")
            ?? Environment.GetEnvironmentVariable("GRAZIE_JWT_TOKEN");
        return key ?? throw new ApplicationException("No grazie key");
    });

    public string GetKey() => _key.Value;
}