using System.Text.Json.Serialization;
using GrazieBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

builder.Services.AddControllers()
    // For displaying enums as strings in swagger
    .AddJsonOptions(options => options
        .JsonSerializerOptions
        .Converters
        .Add(new JsonStringEnumConverter()));

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

app.MapControllers();

app.Run();
