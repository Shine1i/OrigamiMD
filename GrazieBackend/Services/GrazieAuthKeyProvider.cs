using System.Runtime.CompilerServices;

namespace GrazieBackend.Services;

public class GrazieAuthKeyProvider
{
    private Lazy<string> _key;

    public GrazieAuthKeyProvider()
    {
        RefreshKeyFromSource();
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
    public void RefreshKeyFromSource()
    {
        _key = new Lazy<string>(() =>
        {
            // TODO: make work
            return "placeholder";
        });
    }

    public string GetKey() => _key.Value;
}