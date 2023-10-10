using System;
using System.Collections.Generic;

namespace BocadoExpress.Models;

public partial class MetodoPago
{
    public int IdMetodopago { get; set; }
  
    public string? nombremetod { get; set; }

    public byte? Status { get; set; }

    //public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();
}
