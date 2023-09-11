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
    public class ProductoesController : ControllerBase
    {
        private readonly BocadoExpressContext _context;

        public ProductoesController(BocadoExpressContext context)
        {
            _context = context;
        }

        // GET: api/Productoes
        [HttpGet]
        public object GetProductos()
        {

            var ProductGetEnabled = _context.Productos.Where(s => s.Status == 0).Select(s => new
            {
                idControl = s.IdProducto.ToString(),
                Nombre = s.Nombre.ToString(),
                Fecha = s.Fecha.ToString(),
                Precio = s.Precio.ToString()
            }).ToList();


            return ProductGetEnabled;
        }
        // GET: api/Productoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
          if (_context.Productos == null)
          {
              return NotFound();
          }
            var Producto = await _context.Productos.FindAsync(id);

            if (Producto == null)
            {
                return NotFound();
            }

            return Producto;
        }

        // PUT: api/Productoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, Producto productos)
        {
            if (id != productos.IdProducto)
            {
                return BadRequest();
            }

            _context.Entry(productos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
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

        // POST: api/Productoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
          if (_context.Productos == null)
          {
              return Problem("Entity set 'BocadoExpressContext.Productos'  is null.");
          }
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducto", new { id = producto.IdProducto }, producto);
        }

        // DELETE: api/Productoes/5
        [HttpDelete("{id}")]
        public object DeleteProducto(int id)
        {

            //Creamos un objeto dinamico
            //dynamic ResultFinal = new ExpandoObject();

            string query = $"UPDATE Producto SET status = 1 WHERE id_producto = @id_producto";
            int rowsAffected = _context.Database.ExecuteSqlRaw(query, new SqlParameter("@id_producto", id));


            return rowsAffected % 2 == 0 ? false : true;
        }

        private bool ProductoExists(int id)
        {
            return (_context.Productos?.Any(e => e.IdProducto == id)).GetValueOrDefault();
        }
    }
}
