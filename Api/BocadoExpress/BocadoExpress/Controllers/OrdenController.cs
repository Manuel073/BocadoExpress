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
    public class OrdenController : ControllerBase
    {
        private readonly BocadoExpressContext _context;

        public OrdenController(BocadoExpressContext context)
        {
            _context = context;
        }

        // GET: api/Orden
        [HttpGet]
        public object GetOrdens()
        {

            //La condicion que solo me traiga los valores true =0
            var OrdenGetEnabled = _context.Ordens.Where(s => s.Status == 0).Select(s => new
            {
                IdOrden = s.IdOrden.ToString(),
                IdUsu = s.IdUsu.ToString(),
                IdMetodoPa = s.IdMetodoPa.ToString(),
                Total = s.Total.ToString(),
                IdVivien = s.IdVivien.ToString()
                
            }).ToList();


            return OrdenGetEnabled;
        }

        // GET: api/Orden/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Orden>> GetOrdens(int id)
        {
            if (_context.Ordens == null)
            {
                return NotFound();
            }
            var Ordens = await _context.Ordens.FindAsync(id);

            if (Ordens == null)
            {
                return NotFound();
            }

            return Ordens;
        }

        // PUT: api/Orden/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdens(int id, Orden orden)
        {
            if (id != orden.IdOrden)
            {
                return BadRequest();
            }

            _context.Entry(orden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdenExists(id))
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

        // POST: api/Orden
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Orden>> PostOrden(Orden orden)
        {
          if (_context.Ordens == null)
          {
              return Problem("Entity set 'BocadoExpressContext.Ordens'  is null.");
          }
            _context.Ordens.Add(orden);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrden", new { id = orden.IdOrden }, orden);
        }

        // DELETE: api/Orden/5
        [HttpDelete("{id}")]
        public object DeleteOrden(int id)
        {

            //Creamos un objeto dinamico
            //dynamic ResultFinal = new ExpandoObject();

            string query = $"UPDATE Orden SET status = 1 WHERE id_orden = @id_orden";
            int rowsAffected = _context.Database.ExecuteSqlRaw(query, new SqlParameter("@id_orden", id));


            return rowsAffected % 2 == 0 ? false : true;
        }

        private bool OrdenExists(int id)
        {
            return (_context.Ordens?.Any(e => e.IdOrden == id)).GetValueOrDefault();
        }
    }
}
