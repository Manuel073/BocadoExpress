using System;
using System.Collections.Generic;

namespace BocadoExpress.Models;

public partial class Viviendum
{
    public int IdVivienda { get; set; }

    public int? IdUsu { get; set; }

    public string? Direccion { get; set; }

    public string? Barrio { get; set; }

    public string? Ciudad { get; set; }

    public byte? Status { get; set; }

    public virtual Vivienda? IdUsuNavigation { get; set; }

    //public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();
}
