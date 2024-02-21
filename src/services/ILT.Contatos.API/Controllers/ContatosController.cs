using ILT.Contatos.API.Domain.Contato;
using ILT.Contatos.API.Domain.Models;
using ILT.Contatos.API.Domain.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace ILT.Contatos.API.Controllers
{
    [Route("api/contatos")]
    public class ContatosController : MainController
    {
        private readonly IContatoRepository _contatoRepository;
        private readonly IContatoService _contatoService;

        public ContatosController(IContatoRepository contatoRepository, IContatoService contatoService)
        {
            _contatoRepository = contatoRepository;
            _contatoService = contatoService;
        }

        [HttpGet]
        public async Task<IEnumerable<ViewContatoDto>> Get()
        {
            return (await _contatoRepository.GetAllAsyc()).Select(ToDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ViewContatoDto>> Get(string id)
        {
            var contato = await _contatoRepository.GetById(id);
            if (contato == null)
            {
                return NotFound();
            }
            return ToDto(contato);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ViewContatoDto>>> Get([FromQuery] SearchContatoDto search)
        {
            if(search.DataCadastroFim is not null && search.DataCadastroInicio is null)
            {
                AdicionarErroProcessamento("Erro ao buscar contato. Para buscar pela data fim, a data início não pode ser nula.");
                return CustomResponse();
            }
            var contato = await _contatoRepository.GetBySearch(search);
            if (contato == null)
            {
                return NotFound();
            }
            return Ok(contato.Select(ToDto));
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddContatoDto contato)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var result = await _contatoService.CreateAsync(contato);
            if (result is null)
            {
                AdicionarErroProcessamento("Falha ao adicionar contato.");
                return CustomResponse();
            }
            return CreatedAtAction(nameof(Get), new { id = result.Id }, contato);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] UpdContatoDto contato)
        {
            if (id != contato.Id)
            {
                AdicionarErroProcessamento("O id informado não é o mesmo passado na query.");
                return CustomResponse();
            }

            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                if (!await _contatoService.UpdateAsync(id, contato))
                {
                    AdicionarErroProcessamento("Falha ao atualizar contato.");
                    return CustomResponse();
                }
            }
            catch (FormatException)
            {
                AdicionarErroProcessamento($"Falha ao atualizar contato. Id {id} com formato inválido");
                return CustomResponse();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                if (!await _contatoService.DeleteAsync(id))
                {
                    AdicionarErroProcessamento($"Falha ao deletar contato com id {id}");
                    return CustomResponse();
                }
            } catch (FormatException) 
            {
                AdicionarErroProcessamento($"Falha ao deletar contato. Id {id} com formato inválido");
                return CustomResponse();
            }
            return NoContent();
        }

        private ViewContatoDto ToDto(ContatoEntity contato)
        {
            return new ViewContatoDto(contato.Id, contato.Nome, contato.Email, contato.DataCadastro);
        }
    }
}
