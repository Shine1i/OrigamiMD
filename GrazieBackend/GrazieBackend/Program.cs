using System.Text.Json.Serialization;
using GrazieBackend.Services;
using Microsoft.AspNetCore.Cors.Infrastructure; // Import for CORS configuration

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

builder.Services.AddControllers()
    .AddJsonOptions(options => options
        .JsonSerializerOptions
        .Converters
        .Add(new JsonStringEnumConverter()));

// Add CORS services and configure the default policy to allow any origin
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin() // Allows requests from any origin
            .AllowAnyMethod() // Allows all HTTP methods
            .AllowAnyHeader(); // Allows all headers
    });
});

builder.Services.AddScoped<GrazieAuthKeyProvider>();
builder.Services.AddScoped<GrazieService>();
builder.Services.AddSingleton<GrazieBackendRequestToGrazieMessagesStrategy>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply CORS policy globally
app.UseCors();

app.MapControllers();

app.Run();