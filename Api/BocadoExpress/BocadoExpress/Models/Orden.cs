using System;
using System.Collections.Generic;

namespace BocadoExpress.Models;

public partial class Orden
{
    public int IdOrden { get; set; }

    public int? IdUsu { get; set; }

    public int? IdMetodoPa { get; set; }

    public int? Total { get; set; }

    public int? IdVivien { get; set; }

    public byte? Status { get; set; }

    public virtual MetodoPago? IdMetodoPaNavigation { get; set; }

    public virtual Vivienda? IdUsuNavigation { get; set; }

    public virtual Viviendum? IdVivienNavigation { get; set; }

    public virtual ICollection<OrdenDetalle> OrdenDetalles { get; set; } = new List<OrdenDetalle>();
}
