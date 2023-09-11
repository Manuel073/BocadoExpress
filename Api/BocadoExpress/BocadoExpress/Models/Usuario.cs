using System;
using System.Collections.Generic;

namespace BocadoExpress.Models;

public partial class Vivienda
{
    public int IdUsuario { get; set; }

    public string? Nombre { get; set; }

    public string? Contraseña { get; set; }

    public string? FechaCreaUsu { get; set; }

    public byte? Status { get; set; }

    //public virtual ICollection<Carrito> Carritos { get; set; } = new List<Carrito>();

    //public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();

    //public virtual ICollection<Viviendum> Vivienda { get; set; } = new List<Viviendum>();
}
