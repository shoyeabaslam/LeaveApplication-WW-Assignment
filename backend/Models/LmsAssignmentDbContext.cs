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
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-PCUNCE6;database=LMS_Assignment_DB;Integrated Security=True; Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK__Employee__AFB3EC0D9FC88D24");

            entity.Property(e => e.EmpId).HasColumnName("empId");
            entity.Property(e => e.EmployeeEmail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_email");
            entity.Property(e => e.EmployeeName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_name");
            entity.Property(e => e.EmployeePassword)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employee_password");
            entity.Property(e => e.EmployeePhone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("employee_phone");
            entity.Property(e => e.IsAdmin)
                .HasDefaultValue(false)
                .HasColumnName("isAdmin");
            entity.Property(e => e.ManagerId).HasColumnName("managerId");

            
        });

        modelBuilder.Entity<LeaveRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveReq__3213E83F982DE939");

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

            

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
