using ILT.Contatos.API.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", true, true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", true, true)
    .AddEnvironmentVariables();
builder.Services.AddApiConfig(builder.Configuration);
builder.Services.AddSwaggerConfiguration();
builder.Services.RegisterServices();

var app = builder.Build();

app.UseSwaggerConfiguration();
app.UseApiConfig(app.Environment);

app.Run();
