namespace BocadoExpress.Models
{
    public partial class AccesUser
    {

        public int? idControl { get; set; }
        public string? usuario { get; set; }
        public string? contraseña { get; set; }

        public string? direccion { get;set; }

        public string? celular { get; set; }    

        public string? correo { get; set; } 
        public byte? status { get; set; }
        public string? validlogin { get; set; }

    }
}
