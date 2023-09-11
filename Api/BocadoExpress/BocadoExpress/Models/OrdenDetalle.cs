using System;
using System.Collections.Generic;

namespace BocadoExpress.Models;

public partial class OrdenDetalle
{
    public int IdOrdenDetalle { get; set; }

    public int? IdOrde { get; set; }

    public int? IdProduc { get; set; }

    public int? Cantidad { get; set; }

    public int? Precio { get; set; }

    public byte? Status { get; set; }

    public virtual Orden? IdOrdeNavigation { get; set; }

    public virtual Producto? IdProducNavigation { get; set; }
}
