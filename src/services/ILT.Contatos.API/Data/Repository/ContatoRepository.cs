using ILT.Contatos.API.Domain.Contato;
using ILT.Contatos.API.Domain.Models;
using ILT.Contatos.API.Domain.Models.Dtos;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.RegularExpressions;

namespace ILT.Contatos.API.Data.Repository;

public class ContatoRepository : IContatoRepository
{
    private readonly IMongoCollection<ContatoEntity> _contatoCollection;

    public ContatoRepository(IOptions<DatabaseSettings> dbSettings)
    {
        var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
        _contatoCollection = mongoDatabase.GetCollection<ContatoEntity>(dbSettings.Value.ContatosCollectionName);
    }

    public async Task<IEnumerable<ContatoEntity>> GetAllAsyc() =>
            await _contatoCollection.Find(_ => true).SortByDescending(c => c.DataCadastro).ToListAsync();

    public async Task<ContatoEntity> GetById(string id) =>
        await _contatoCollection.Find(a => a.Id == id).FirstOrDefaultAsync();

    public async Task<IEnumerable<ContatoEntity>> GetBySearch(SearchContatoDto search)
    {
        var filterBuilder = Builders<ContatoEntity>.Filter;
        var filter = filterBuilder.Empty;

        if (!string.IsNullOrEmpty(search.Nome))
        {
            var nomeRegex = new BsonRegularExpression(new Regex(search.Nome, RegexOptions.IgnoreCase));
            filter &= filterBuilder.Regex(x => x.Nome, nomeRegex);
        }

        if (!string.IsNullOrEmpty(search.Email))
        {
            var emailRegex = new BsonRegularExpression(new Regex(search.Email, RegexOptions.IgnoreCase));
            filter &= filterBuilder.Regex(x => x.Email, emailRegex);
        }

        if (search.DataCadastroInicio.HasValue && search.DataCadastroFim.HasValue)
        {
            filter &= filterBuilder.Gte(x => x.DataCadastro, search.DataCadastroInicio) &
                      filterBuilder.Lte(x => x.DataCadastro, search.DataCadastroFim);
        }
        else if (search.DataCadastroInicio.HasValue)
        {
            filter &= filterBuilder.Gte(x => x.DataCadastro, search.DataCadastroInicio);
        }
        else if (search.DataCadastroFim.HasValue)
        {
            filter &= filterBuilder.Lte(x => x.DataCadastro, search.DataCadastroFim);
        }

        return await _contatoCollection.Find(filter).SortByDescending(c => c.DataCadastro).ToListAsync();
    }



    public async Task CreateAsync(ContatoEntity ContatoEntity) =>
        await _contatoCollection.InsertOneAsync(ContatoEntity);

    public async Task UpdateAsync(string id, ContatoEntity ContatoEntity) =>
        await _contatoCollection
        .ReplaceOneAsync(a => a.Id == id, ContatoEntity);

    public async Task DeleteAysnc(string id) =>
        await _contatoCollection.DeleteOneAsync(a => a.Id == id);
}
