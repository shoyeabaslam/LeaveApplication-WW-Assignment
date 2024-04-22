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
            entity.HasKey(e => e.EmpId).HasName("PK__Employee__16EBFA26072F9877");

            entity.Property(e => e.EmpId)
                .ValueGeneratedNever()
                .HasColumnName("EMP_ID");
            entity.Property(e => e.EmpEmail)
                .HasMaxLength(255)
                .HasColumnName("EMP_EMAIL");
            entity.Property(e => e.EmpName)
                .HasMaxLength(255)
                .HasColumnName("EMP_NAME");
            entity.Property(e => e.EmpPass)
                .HasMaxLength(255)
                .HasColumnName("EMP_PASS");
            entity.Property(e => e.TotalLeave)
                .HasDefaultValue(20)
                .HasColumnName("TOTAL_LEAVE");
        });

        modelBuilder.Entity<LeaveRequest>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__LeaveReq__33A8519A44D48C5D");

            entity.Property(e => e.RequestId).HasColumnName("RequestID");
            entity.Property(e => e.EmpName).HasMaxLength(255);
            entity.Property(e => e.EmpPhone).HasMaxLength(20);
            entity.Property(e => e.FromDate).HasColumnType("datetime");
            entity.Property(e => e.ManagerEmail).HasMaxLength(255);
            entity.Property(e => e.ToDate).HasColumnType("datetime");
            entity.Property(e => e.TotalDays)
                .HasComputedColumnSql("(datediff(day,[FromDate],[ToDate])+case when CONVERT([time],[FromDate])<'09:30' then case when CONVERT([time],[ToDate])>='14:00' then (1) else (0.5) end when CONVERT([time],[FromDate])>='09:30' AND CONVERT([time],[FromDate])<'14:00' then case when CONVERT([time],[ToDate])>='14:00' then (0.5) else (0) end else (0) end)", false)
                .HasColumnType("numeric(12, 1)");
        });

        modelBuilder.Entity<Manager>(entity =>
        {
            entity.HasKey(e => e.MId).HasName("PK__Managers__18B1A317F8BE0946");

            entity.Property(e => e.MId)
                .ValueGeneratedNever()
                .HasColumnName("M_ID");
            entity.Property(e => e.Isadmin).HasColumnName("ISADMIN");
            entity.Property(e => e.MEmail)
                .HasMaxLength(255)
                .HasColumnName("M_EMAIL");
            entity.Property(e => e.MName)
                .HasMaxLength(255)
                .HasColumnName("M_NAME");
            entity.Property(e => e.MPass)
                .HasMaxLength(255)
                .HasColumnName("M_PASS");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
