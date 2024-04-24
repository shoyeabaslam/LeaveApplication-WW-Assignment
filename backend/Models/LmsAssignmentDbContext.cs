using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class LmsAssignmentDbContext : DbContext
{
    public LmsAssignmentDbContext()
    {
    }

    public LmsAssignmentDbContext(DbContextOptions<LmsAssignmentDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<LeaveRequest> LeaveRequests { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-PCUNCE6;database=LMS_Assignment_DB;Integrated Security=True; Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__C52E0BA8A5F0D4CA");

            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.EmployeeEmail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_email");
            entity.Property(e => e.EmployeeName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_name");
            entity.Property(e => e.EmployeePassword)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_password");
            entity.Property(e => e.EmployeePhone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("employee_phone");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.ManagerId).HasColumnName("manager_id");

            entity.HasOne(d => d.Manager).WithMany(p => p.InverseManager)
                .HasForeignKey(d => d.ManagerId)
                .HasConstraintName("FK__Employees__manag__5CD6CB2B");
        });

        modelBuilder.Entity<LeaveRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveReq__3213E83FA0BBD0D8");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.EmpId).HasColumnName("emp_id");
            entity.Property(e => e.FromDate).HasColumnName("from_date");
            entity.Property(e => e.FromLeaveShift)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("from_leave_shift");
            entity.Property(e => e.LeaveStatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("leave_status");
            entity.Property(e => e.MngEmail)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("mng_email");
            entity.Property(e => e.MngId).HasColumnName("mng_id");
            entity.Property(e => e.ReasonForLeave)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("reason_for_leave");
            entity.Property(e => e.ToDate).HasColumnName("to_date");
            entity.Property(e => e.ToLeaveShift)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("to_leave_shift");
            entity.Property(e => e.TotalDays).HasColumnName("total_days");

            entity.HasOne(d => d.Emp).WithMany(p => p.LeaveRequestEmps)
                .HasForeignKey(d => d.EmpId)
                .HasConstraintName("FK__LeaveRequ__emp_i__6D0D32F4");

            entity.HasOne(d => d.Mng).WithMany(p => p.LeaveRequestMngs)
                .HasForeignKey(d => d.MngId)
                .HasConstraintName("FK__LeaveRequ__mng_i__6E01572D");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
