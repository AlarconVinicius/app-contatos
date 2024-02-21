using ILT.Contatos.API.Domain.Models.Dtos;

namespace ILT.Contatos.API.Domain.Contato;

public class ContatoService : IContatoService
{
    private readonly IContatoRepository _contatoRepository;

    public ContatoService(IContatoRepository contatoRepository)
    {
        _contatoRepository = contatoRepository;
    }

    public async Task<ViewContatoDto> CreateAsync(AddContatoDto contato)
    {
        var contatoMap = contato.ToEntity();
        await _contatoRepository.CreateAsync(contatoMap);
        return new ViewContatoDto(contatoMap.Id, contatoMap.Nome, contatoMap.Email, contatoMap.DataCadastro);
    }

    public async Task<bool> UpdateAsync(string id, UpdContatoDto contato)
    {
        var contatoDb = await _contatoRepository.GetById(id);
        if (id != contato.Id || contatoDb is null) return false;

        contatoDb.Nome = contato.Nome;
        contatoDb.Email = contato.Email;

        await _contatoRepository.UpdateAsync(id, contatoDb);
        return true;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var contatoDb = await _contatoRepository.GetById(id);
        if (contatoDb is null) return false;
        await _contatoRepository.DeleteAysnc(id);
        return true;
    }
}
