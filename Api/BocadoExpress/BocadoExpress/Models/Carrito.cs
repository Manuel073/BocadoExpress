using System;
using System.Collections.Generic;

namespace BocadoExpress.Models;

public partial class Carrito
{
    public int IdCarrito { get; set; }

    public int? IdUsu { get; set; }

    public int? IdProduc { get; set; }

    public int? Cantidad { get; set; }

    public byte? Status { get; set; }

    public virtual Producto? IdProducNavigation { get; set; }

    public virtual Vivienda? IdUsuNavigation { get; set; }
}
