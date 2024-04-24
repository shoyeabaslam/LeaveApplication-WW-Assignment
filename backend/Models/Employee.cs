using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string? EmployeeName { get; set; }

    public string? EmployeeEmail { get; set; }

    public string? EmployeePhone { get; set; }

    public string? EmployeePassword { get; set; }

    public int? ManagerId { get; set; }

    public bool? IsAdmin { get; set; }

    public virtual ICollection<Employee> InverseManager { get; set; } = new List<Employee>();

    public virtual ICollection<LeaveRequest> LeaveRequestEmps { get; set; } = new List<LeaveRequest>();

    public virtual ICollection<LeaveRequest> LeaveRequestMngs { get; set; } = new List<LeaveRequest>();

    public virtual Employee? Manager { get; set; }
}
