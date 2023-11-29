using BocadoExpress.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;

namespace BocadoExpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccesUserController : Controller
    {

        private readonly BocadoExpressContext _context;

        public AccesUserController(BocadoExpressContext context)
        {
            _context = context;
        }



        [HttpGet("AllUsers")]
        public async Task<object> AllUsers()
        {
            return await _context.AccesUser.ToListAsync();
        }

        [HttpGet("ConfirmSession")]

        public async Task<object> SessionUser(string user, string pswd)
        {
            dynamic infoUser = new ExpandoObject();

            var taskConfirmSession = _context.AccesUser.Where
                (x => x.usuario == user && x.contraseña == pswd).
                FirstOrDefault();

            if (taskConfirmSession is not null)
            {
                infoUser.token = taskConfirmSession.validlogin;
                return infoUser;
            }

            infoUser.token = BadRequest("Elemento no encontrado en el servidor.");
            return infoUser;
        }


        [HttpPost("CreateUser")]
        public async Task<object> CreateUser(AccesUser accesUser)
        {

            var taskToSearch = _context.AccesUser.Where(x => x.usuario == accesUser.usuario
            && x.contraseña == accesUser.contraseña);

            if (taskToSearch.Any())
            {
                return BadRequest("Elementos encontrados dentro de la base de datos.");
            }

            var Query = "INSERT INTO AccesUser(Usuario, Contraseña, Celular, Correo, Direccion, status,ValidLogin) " +
           "VALUES(@Usuario,@Contraseña,@Celular,@Correo,@Direccion,@status,@ValidLogin);";

            var Parametros = new SqlParameter[]
           {
                new SqlParameter("@Usuario",accesUser.usuario),
                 new SqlParameter("@Contraseña",accesUser.contraseña),
                  new SqlParameter("@Celular",accesUser.celular),
                   new SqlParameter("@Correo",accesUser.correo),
                    new SqlParameter("@Direccion",accesUser.direccion),
                     new SqlParameter("@status",accesUser.status),
                      new SqlParameter("@ValidLogin",accesUser.validlogin),
           };

            var ExecuteSql = _context.Database.ExecuteSqlRaw(Query, Parametros);
            return Ok(new { Msg = "Insertado con exito." });
        }


        /* Recuperar Contraseña*/
        [HttpPut("UpdateForgottenpassword")]

        public async Task<object> UpdateForgottenpassword(string user,string newPswd)
        {
            dynamic response = new ExpandoObject();
            var taskInfoUser = _context.AccesUser.Where(x => x.usuario == user).
                FirstOrDefault();

            if (taskInfoUser is not null)
            {
                response.user = taskInfoUser.usuario;
                response.pswd = taskInfoUser.contraseña;

                var SqlQuery = $"UPDATE AccesUser SET Contraseña='{newPswd}'"+
                $"WHERE idControl=@idControl";


                var Parametros = new SqlParameter[]
           {
               new SqlParameter("@idControl",taskInfoUser.idControl)
           };

                var ExecuteSql=_context.Database.ExecuteSqlRaw(SqlQuery, Parametros);

                return ExecuteSql;
            }

            return BadRequest(null);
        }

        }
}
