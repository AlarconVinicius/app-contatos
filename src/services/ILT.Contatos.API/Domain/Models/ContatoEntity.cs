using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ILT.Contatos.API.Domain.Models;

public class ContatoEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    [StringLength(30, MinimumLength = 2, ErrorMessage = "O campo {0} precisa ter entre {1} e {2} caracteres")]
    public string Nome { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório")]
    [StringLength(60, ErrorMessage = "O campo {0} precisa ter no máximo {1} caracteres")]
    [EmailAddress]
    public string Email { get; set; }

    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime DataCadastro { get; set; }

    public ContatoEntity()
    {
        DataCadastro = DateTime.UtcNow;
    }

    public ContatoEntity(string nome, string email) : this()
    {
        Nome = nome;
        Email = email;
    }
}
