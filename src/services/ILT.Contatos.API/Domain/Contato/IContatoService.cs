using ILT.Contatos.API.Domain.Models.Dtos;

namespace ILT.Contatos.API.Domain.Contato;
public interface IContatoService
{
    Task<ViewContatoDto> CreateAsync(AddContatoDto contato);
    Task<bool> UpdateAsync(string id, UpdContatoDto contato);
    Task<bool> DeleteAsync(string id);
}