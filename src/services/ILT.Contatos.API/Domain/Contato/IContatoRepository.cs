using ILT.Contatos.API.Domain.Models;
using ILT.Contatos.API.Domain.Models.Dtos;

namespace ILT.Contatos.API.Domain.Contato;
public interface IContatoRepository
{
    Task<IEnumerable<ContatoEntity>> GetAllAsyc();
    Task<ContatoEntity> GetById(string id);
    Task<IEnumerable<ContatoEntity>> GetBySearch(SearchContatoDto search);
    Task CreateAsync(ContatoEntity contato);
    Task UpdateAsync(string id, ContatoEntity contato);
    Task DeleteAysnc(string id);
}