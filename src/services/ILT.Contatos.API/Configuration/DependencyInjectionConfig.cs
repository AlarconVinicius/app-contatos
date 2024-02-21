using ILT.Contatos.API.Data.Repository;
using ILT.Contatos.API.Domain.Contato;

namespace ILT.Contatos.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IContatoRepository, ContatoRepository>();
            services.AddScoped<IContatoService, ContatoService>();
        }
    }
}
