using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class LeavemanagementsystemContext : DbContext
{
    public LeavemanagementsystemContext()
    {
    }

    public LeavemanagementsystemContext(DbContextOptions<LeavemanagementsystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<LeaveRequest> LeaveRequests { get; set; }

    public virtual DbSet<Manager> Managers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-PCUNCE6;database=leavemanagementsystem;Integrated Security=True; Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmpEmail).HasName("PK__Employee__3D542B0915D14277");

            entity.HasIndex(e => e.Id, "UQ__Employee__3213E83EAB533907").IsUnique();

            entity.Property(e => e.EmpEmail)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("emp_email");
            entity.Property(e => e.EmpId)
                .HasMaxLength(4000)
                .HasComputedColumnSql("('EMP'+format([id],'000'))", false)
                .HasColumnName("emp_id");
            entity.Property(e => e.EmpName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("emp_name");
            entity.Property(e => e.EmpPassword)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("emp_password");
            entity.Property(e => e.EmpPhone)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("emp_phone");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
        });

        modelBuilder.Entity<LeaveRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveReq__3213E83F8B80BB80");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EmpEmail)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("emp_email");
            entity.Property(e => e.FromDate)
                .HasColumnType("datetime")
                .HasColumnName("from_date");
            entity.Property(e => e.LeaveStatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("leave_status");
            entity.Property(e => e.MngEmail)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("mng_email");
            entity.Property(e => e.ReasonForLeave)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("reason_for_leave");
            entity.Property(e => e.ToDate)
                .HasColumnType("datetime")
                .HasColumnName("to_date");
            entity.Property(e => e.TotalDays).HasColumnName("total_days");

            entity.HasOne(d => d.EmpEmailNavigation).WithMany(p => p.LeaveRequests)
                .HasForeignKey(d => d.EmpEmail)
                .HasConstraintName("FK__LeaveRequ__emp_e__6EF57B66");

            entity.HasOne(d => d.MngEmailNavigation).WithMany(p => p.LeaveRequests)
                .HasForeignKey(d => d.MngEmail)
                .HasConstraintName("FK__LeaveRequ__mng_e__6FE99F9F");
        });

        modelBuilder.Entity<Manager>(entity =>
        {
            entity.HasKey(e => e.MngEmail).HasName("PK__Managers__BC5B379FA7C8D7B5");

            entity.Property(e => e.MngEmail)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("mng_email");
            entity.Property(e => e.IsAdmin).HasColumnName("is_admin");
            entity.Property(e => e.MngName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("mng_name");
            entity.Property(e => e.MngPassword)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("mng_password");
            entity.Property(e => e.MngPhone)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("mng_phone");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
