using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string? EmpId { get; set; }

    public string? EmpName { get; set; }

    public string? EmpPhone { get; set; }

    public string EmpEmail { get; set; } = null!;

    public string? EmpPassword { get; set; }

    public virtual ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();
}
