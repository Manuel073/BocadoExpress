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
    public class MetodoPagoController : ControllerBase
    {
        private readonly BocadoExpressContext _context;

        public MetodoPagoController(BocadoExpressContext context)
        {
            _context = context;
        }

        // GET: api/MetodoPago
        [HttpGet]
        public object GetMetodoPago()
        {
            var MetodoPagoGetEnabled = _context.MetodoPago.Where(s => s.Status == 0).Select(s => new
            {
                IdMetodopago = s.IdMetodopago.ToString(),
                nombre = s.nombremetod.ToString()

            }).ToList();


            return MetodoPagoGetEnabled;
        }

        // GET: api/MetodoPago/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MetodoPago>> GetMetodoPago(int id, ActionResult<MetodoPago> metodoPagoGetEnabled)
        {
            if (_context.MetodoPago == null)
            {
                return NotFound();
            }
            var MetodoPago = await _context.MetodoPago.FindAsync(id);

            if (MetodoPago == null)
            {
                return NotFound();
            }

            return MetodoPago;
        }

        // PUT: api/MetodoPago/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMetodoPago(int id, MetodoPago metodoPago)
        {
            if (id != metodoPago.IdMetodopago)
            {
                return BadRequest();
            }

            _context.Entry(metodoPago).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MetodoPagoExists(id))
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

        // POST: api/MetodoPago
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MetodoPago>> PostMetodoPago(MetodoPago metodoPago)
        {
          if (_context.MetodoPago == null)
          {
              return Problem("Entity set 'BocadoExpressContext.MetodoPagos'  is null.");
          }
            _context.MetodoPago.Add(metodoPago);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMetodoPago", new { id = metodoPago.IdMetodopago }, metodoPago);
        }

        // DELETE: api/MetodoPago/5
        [HttpDelete("{id}")]
        public object DeleteMetodoPago(int id)
        {
            //Creamos un objeto dinamico
            //dynamic ResultFinal = new ExpandoObject();

            string query = $"UPDATE MetodoPago SET status = 1 WHERE id_metodopago = @id_metodopago";
            int rowsAffected = _context.Database.ExecuteSqlRaw(query, new SqlParameter("@id_metodopago", id));


            return rowsAffected % 2 == 0 ? false : true;
        }

        private bool MetodoPagoExists(int id)
        {
            return (_context.MetodoPago?.Any(e => e.IdMetodopago == id)).GetValueOrDefault();
        }
    }
}
