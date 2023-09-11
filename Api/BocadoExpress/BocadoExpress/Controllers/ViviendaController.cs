using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BocadoExpress.Models;
using Microsoft.Data.SqlClient;

namespace BocadoExpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViviendaController : ControllerBase
    {
        private readonly BocadoExpressContext _context;

        public ViviendaController(BocadoExpressContext context)
        {
            _context = context;
        }

        // GET: api/Vivienda
        [HttpGet]
        public object GetVivienda()
        {

            var ViviendaGetEnabled = _context.Vivienda.Where(s => s.Status == 0).Select(s => new
            {
                idControl = s.IdVivienda.ToString(),
                IdUsu = s.IdUsu.ToString(),
                Direccion = s.Direccion.ToString(),
                Barrio = s.Barrio.ToString(),
                Ciudad = s.Ciudad.ToString()
            }).ToList();

            
            return ViviendaGetEnabled;
        }

        // GET: api/Vivienda/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vivienda>> GetVivienda(int id, ActionResult<Vivienda> viviendum)
        {
            if (_context.Vivienda == null)
            {
                return NotFound();
            }
            var Viviendum = await _context.Vivienda.FindAsync(id);

            if (Viviendum == null)
            {
                return NotFound();
            }

            return viviendum;
        }

        // PUT: api/Vivienda/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Viviendum Vivienda)
        {
            if (id != Vivienda.IdVivienda)
            {
                return BadRequest();
            }

            _context.Entry(Vivienda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViviendumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Vivienda
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Viviendum>> PostViviendum(Viviendum viviendum)
        {
          if (_context.Vivienda == null)
          {
              return Problem("Entity set 'BocadoExpressContext.Vivienda'  is null.");
          }
            _context.Vivienda.Add(viviendum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetViviendum", new { id = viviendum.IdVivienda }, viviendum);
        }

        // DELETE: api/Vivienda/5
        [HttpDelete("{id}")]
        public async Task<object> DeleteVivienda(int id)
        {

            //Creamos un objeto dinamico
            //dynamic ResultFinal = new ExpandoObject();

            string query = $"UPDATE Vivienda SET status = 1 WHERE id_vivienda = @id_vivienda";
            int rowsAffected = _context.Database.ExecuteSqlRaw(query, new SqlParameter("@id_vivienda", id));


            return rowsAffected % 2 == 0 ? false : true;
        }

        private bool ViviendumExists(int id)
        {
            return (_context.Vivienda?.Any(e => e.IdVivienda == id)).GetValueOrDefault();
        }
    }
}
