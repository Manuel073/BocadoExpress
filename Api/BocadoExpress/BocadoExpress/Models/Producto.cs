using System;
using System.Collections.Generic;

namespace BocadoExpress.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string? Nombre { get; set; }

    public DateTime? Fecha { get; set; }

    public int? Precio { get; set; }

    public byte? Status { get; set; }
   //public object? IdMetodopago { get; internal set; }

    //public virtual ICollection<Carrito> Carritos { get; set; } = new List<Carrito>();

    //public virtual ICollection<OrdenDetalle> OrdenDetalles { get; set; } = new List<OrdenDetalle>();
}
