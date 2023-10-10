using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BocadoExpress.Models;
using Microsoft.Data.SqlClient;
using System.Dynamic;

namespace BocadoExpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly BocadoExpressContext _context;

        public UsuariosController(BocadoExpressContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<object>> GetUsuarios()
        {
            dynamic resp = new ExpandoObject();
            //La condicion que solo me traiga los valores true =0
            var response = await _context.Usuarios.Where(s => s.Status == 0).ToListAsync();
            resp.data = response;

            if (response.Count()==0)
            {
                resp.data = null;
                return resp;
            }

            return resp;
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vivienda>> GetUsuario(int id)
        {
          if (_context.Usuarios == null)
          {
              return NotFound();
          }
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Vivienda usuario)
        {
            if (id != usuario.IdUsuario)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vivienda>> PostUsuario(Vivienda usuario)
        {

            dynamic resp = new ExpandoObject();

          if (_context.Usuarios == null)
          {
              return Problem("Entity set 'BocadoExpressContext.Usuarios'  is null.");
          }
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            resp.response = "La informacion se ha insertado correctamente.";

            return resp;
        }

        // DELETE: api/Usuarios/5
        //Este valor aca no se elimina si no se cambia de status
        [HttpDelete("{id}")]
        public async Task<object> DeleteUsuario(int id)
        {

            //Creamos un objeto dinamico
            //dynamic ResultFinal = new ExpandoObject();

            string query = $"UPDATE Usuario SET status = 1 WHERE id_usuario = @id_usuario";
            int rowsAffected = _context.Database.ExecuteSqlRaw(query, new SqlParameter("@id_usuario", id));


            return rowsAffected % 2 == 0 ? false : true;
        }

        private bool UsuarioExists(int id)
        {
            return (_context.Usuarios?.Any(e => e.IdUsuario == id)).GetValueOrDefault();
        }
    }
}
