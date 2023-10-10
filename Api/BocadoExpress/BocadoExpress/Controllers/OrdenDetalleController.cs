using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BocadoExpress.Models;
using Microsoft.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
using BocadoExpress.ModelsView;

namespace BocadoExpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenDetalleController : ControllerBase
    {
        private readonly BocadoExpressContext _context;

        public OrdenDetalleController(BocadoExpressContext context)
        {
            _context = context;
        }

        // GET: api/OrdenDetalle
        [HttpGet]
        public async Task<object> GetOrdenDetalle()
        {
            return await _context.OrdenDetalleView.ToListAsync();

        }
        // GET: api/OrdenDetalle/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdenDetalle>> GetOrdenDetalles(int id)
        {
            if (_context.OrdenDetalles == null)
            {
                return NotFound();
            }
            var OrdenDetalle = await _context.OrdenDetalles.FindAsync(id);

            if (OrdenDetalle == null)
            {
                return NotFound();
            }

            return OrdenDetalle;
        }
        // PUT: api/OrdenDetalle/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdenDetalle(int id, OrdenDetalle OrdenDetalle)
        {
            if (id != OrdenDetalle.IdOrdenDetalle)
            {
                return BadRequest();
            }

            _context.Entry(OrdenDetalle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdenDetalleExists(id))
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


        // POST: api/OrdenDetalle
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrdenDetalle>> PostOrdenDetalle(OrdenDetalle ordenDetalle)
        {
          if (_context.OrdenDetalles == null)
          {
              return Problem("Entity set 'BocadoExpressContext.OrdenDetalles'  is null.");
          }
            _context.OrdenDetalles.Add(ordenDetalle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrdenDetalle", new { id = ordenDetalle.IdOrdenDetalle }, ordenDetalle);
        }

        // DELETE: api/OrdenDetalle/5
        [HttpDelete("{id}")]
        public object DeleteOrdenDetalle(int id)
        {

            //Creamos un objeto dinamico
            //dynamic ResultFinal = new ExpandoObject();

            string query = $"UPDATE OrdenDetalle SET status = 1 WHERE id_orden_detalle = @id_orden_detalle";
            int rowsAffected = _context.Database.ExecuteSqlRaw(query, new SqlParameter("@id_orden_detalle", id));


            return rowsAffected % 2 == 0 ? false : true;
        }

        private bool OrdenDetalleExists(int id)
        {
            return (_context.OrdenDetalles?.Any(e => e.IdOrdenDetalle == id)).GetValueOrDefault();
        }
    }
}
