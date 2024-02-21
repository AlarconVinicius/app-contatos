using System.ComponentModel.DataAnnotations;

namespace ILT.Contatos.API.Domain.Models.Dtos;

public record AddContatoDto
{
    [Required(ErrorMessage = "O campo Nome é obrigatório")]
    [StringLength(30, MinimumLength = 2, ErrorMessage = "O campo Nome precisa ter entre 2 e 30 caracteres")]
    public string Nome { get; set; }

    [Required(ErrorMessage = "O campo Email é obrigatório")]
    [StringLength(60, ErrorMessage = "O campo Email precisa ter no máximo 60 caracteres")]
    [EmailAddress(ErrorMessage = "O campo Email está em formato inválido")]
    public string Email { get; set; }

    public AddContatoDto(string nome, string email)
    {
        Nome = nome;
        Email = email;
    }

    public ContatoEntity ToEntity()
    {
        return new ContatoEntity { Nome = Nome, Email = Email };
    }
}
public record UpdContatoDto
{
    [Required(ErrorMessage = "O Id é obrigatório")]
    public string Id { get; set; }

    [Required(ErrorMessage = "O campo Nome é obrigatório")]
    [StringLength(30, MinimumLength = 2, ErrorMessage = "O campo Nome precisa ter entre 2 e 30 caracteres")]
    public string Nome { get; set; }

    [Required(ErrorMessage = "O campo Email é obrigatório")]
    [StringLength(60, ErrorMessage = "O campo Email precisa ter no máximo 60 caracteres")]
    [EmailAddress(ErrorMessage = "O campo Email está em formato inválido")]
    public string Email { get; set; }

    public UpdContatoDto(string id, string nome, string email)
    {
        Id = id;
        Nome = nome;
        Email = email;
    }
}

public class SearchContatoDto
{
    public string Nome { get; set; }
    public string Email { get; set; }
    public DateTime? DataCadastroInicio { get; set; }
    public DateTime? DataCadastroFim { get; set; }

    public SearchContatoDto()
    {
        
    }
    public SearchContatoDto(string nome = null, string email = null, DateTime? dataCadastroInicio = null, DateTime? dataCadastroFim = null)
    {
        Nome = nome;
        Email = email;
        DataCadastroInicio = dataCadastroInicio;
        DataCadastroFim = dataCadastroFim;
    }
}


public record ViewContatoDto(string Id, string Nome, string Email, DateTime DataCadastro);


