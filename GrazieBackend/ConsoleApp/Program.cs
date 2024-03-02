namespace ConsoleApp;

internal static class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine(Environment.GetEnvironmentVariable("GRAZIE_JWT_TOKEN"));
    }
}