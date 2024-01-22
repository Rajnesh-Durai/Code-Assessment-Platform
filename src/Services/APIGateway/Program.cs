using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
builder.Services.AddOcelot(builder.Configuration);
builder.WebHost.UseUrls("http://localhost:9004", "https://localhost:9005");
builder.Services.AddLogging();
#region CORS Configuration
builder.Services.AddCors(option =>
{
    option.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowAnyOrigin();
    });
});
#endregion
var app = builder.Build();

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseOcelot().Wait();

app.Run();
