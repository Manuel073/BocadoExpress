using System;
using System.Collections.Generic;
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
    public class CarritoController : ControllerBase
    {
        private readonly BocadoExpressContext _context;

        public CarritoController(BocadoExpressContext context)
        {
            _context = context;
        }

        // GET: api/Carrito
        [HttpGet]
        public object GetCarrito()
        {

            var CarritoGetEnabled = _context.Carritos.Where(s => s.Status == 0).Select(s => new
            {
                idControl = s.IdCarrito.ToString(),
                IdUsu = s.IdUsu.ToString(),
                IdProduc = s.IdProduc.ToString(),
                Cantidad = s.Cantidad.ToString()
            }).ToList();


            return CarritoGetEnabled;
        }

        // GET: api/Carrito/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Carrito>> GetCarrito(int id)
        {
            if (_context.Carritos == null)
            {
                return NotFound();
            }
            var Carrito = await _context.Carritos.FindAsync(id);

            if (Carrito == null)
            {
                return NotFound();
            }

            return Carrito;
        }

        // PUT: api/Carrito/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarrito(int id, Carrito carrito)
        {
            if (id != carrito.IdCarrito)
            {
                return BadRequest();
            }

            _context.Entry(carrito).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarritoExists(id))
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

        // POST: api/Carrito
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Carrito>> PostCarrito(Carrito carrito)
        {
          if (_context.Carritos == null)
          {
              return Problem("Entity set 'BocadoExpressContext.Carritos'  is null.");
          }
            _context.Carritos.Add(carrito);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarrito", new { id = carrito.IdCarrito }, carrito);
        }

        // DELETE: api/Carrito/5
        [HttpDelete("{id}")]
        public object DeleteCarrito(int id)
        {

            //Creamos un objeto dinamico
            //dynamic ResultFinal = new ExpandoObject();

            string query = $"UPDATE Carrito SET status = 1 WHERE id_carrito = @id_carrito";
            int rowsAffected = _context.Database.ExecuteSqlRaw(query, new SqlParameter("@id_carrito", id));


            return rowsAffected % 2 == 0 ? false : true;
        }

        private bool CarritoExists(int id)
        {
            return (_context.Carritos?.Any(e => e.IdCarrito == id)).GetValueOrDefault();
        }
    }
}
