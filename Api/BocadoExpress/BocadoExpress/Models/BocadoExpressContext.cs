using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BocadoExpress.Models;

public partial class BocadoExpressContext : DbContext
{
    public BocadoExpressContext()
    {
    }

    public BocadoExpressContext(DbContextOptions<BocadoExpressContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Carrito> Carritos { get; set; }

    public virtual DbSet<MetodoPago> MetodoPagos { get; set; }

    public virtual DbSet<Orden> Ordens { get; set; }

    public virtual DbSet<OrdenDetalle> OrdenDetalles { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Vivienda> Usuarios { get; set; }

    public virtual DbSet<Viviendum> Vivienda { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=MANUEL\\SQLEXPRESS; Database=BocadoExpress; Trusted_Connection=True;Encrypt=False;TrustServerCertificate=Yes ");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Carrito>(entity =>
        {
            entity.HasKey(e => e.IdCarrito);

            entity.ToTable("Carrito");

            entity.Property(e => e.IdCarrito).HasColumnName("id_carrito");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.IdProduc).HasColumnName("idProduc");
            entity.Property(e => e.IdUsu).HasColumnName("idUsu");
            entity.Property(e => e.Status).HasColumnName("status");

            //entity.HasOne(d => d.IdProducNavigation).WithMany(p => p.Carritos)
            //    .HasForeignKey(d => d.IdProduc)
               // .HasConstraintName("FK_Carrito_Producto");

            //entity.HasOne(d => d.IdUsuNavigation).WithMany(p => p.Carritos)
             //   .HasForeignKey(d => d.IdUsu)
              //  .HasConstraintName("FK_Carrito_Usuario");
        });

        modelBuilder.Entity<MetodoPago>(entity =>
        {
            entity.HasKey(e => e.IdMetodopago);

            entity.ToTable("Metodo_pago");

            entity.Property(e => e.IdMetodopago).HasColumnName("id_metodopago");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.IdOrden);

            entity.ToTable("Orden");

            entity.Property(e => e.IdOrden).HasColumnName("id_orden");
            entity.Property(e => e.IdMetodoPa).HasColumnName("idMetodoPa");
            entity.Property(e => e.IdUsu).HasColumnName("idUsu");
            entity.Property(e => e.IdVivien).HasColumnName("idVivien");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Total).HasColumnName("total");

            entity.HasOne(d => d.IdMetodoPaNavigation).WithMany(p => p.Ordens)
                .HasForeignKey(d => d.IdMetodoPa)
                .HasConstraintName("FK_Orden_Metodo_pago");

            //entity.HasOne(d => d.IdUsuNavigation).WithMany(p => p.Ordens)
               // .HasForeignKey(d => d.IdUsu)
               // .HasConstraintName("FK_Orden_Usuario");

            //entity.HasOne(d => d.IdVivienNavigation).WithMany(p => p.Ordens)
              //  .HasForeignKey(d => d.IdVivienda)
               // .HasConstraintName("FK_Orden_Vivienda");
        });

        modelBuilder.Entity<OrdenDetalle>(entity =>
        {
            entity.HasKey(e => e.IdOrdenDetalle);

            entity.ToTable("Orden_detalle");

            entity.Property(e => e.IdOrdenDetalle).HasColumnName("id_orden_detalle");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.IdOrde).HasColumnName("idOrde");
            entity.Property(e => e.IdProduc).HasColumnName("idProduc");
            entity.Property(e => e.Precio).HasColumnName("precio");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.IdOrdeNavigation).WithMany(p => p.OrdenDetalles)
                .HasForeignKey(d => d.IdOrde)
                .HasConstraintName("FK_Orden_detalle_Orden");

            //entity.HasOne(d => d.IdProducNavigation).WithMany(p => p.OrdenDetalles)
                //.HasForeignKey(d => d.IdProduc)
               // .HasConstraintName("FK_Orden_detalle_Producto");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto).HasName("PK_Protocolo");

            entity.ToTable("Producto");

            entity.Property(e => e.IdProducto).HasColumnName("id_producto");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio).HasColumnName("precio");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<Vivienda>(entity =>
        {
            entity.HasKey(e => e.IdUsuario);

            entity.ToTable("Usuario");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.FechaCreaUsu)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("fecha_crea_usu");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<Viviendum>(entity =>
        {
            entity.HasKey(e => e.IdVivienda);

            entity.Property(e => e.IdVivienda).HasColumnName("id_vivienda");
            entity.Property(e => e.Barrio)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("barrio");
            entity.Property(e => e.Ciudad)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ciudad");
            entity.Property(e => e.Direccion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.IdUsu).HasColumnName("idUsu");
            entity.Property(e => e.Status).HasColumnName("status");

            //entity.HasOne(d => d.IdUsuNavigation).WithMany(p => p.Vivienda)
             //  .HasForeignKey(d => d.IdUsu)
              //  .HasConstraintName("FK_Vivienda_Usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
