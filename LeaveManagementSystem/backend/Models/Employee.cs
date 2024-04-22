using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Employee
{
    public int EmpId { get; set; }

    public string EmpName { get; set; } = null!;

    public string EmpEmail { get; set; } = null!;

    public string EmpPass { get; set; } = null!;

    public int? TotalLeave { get; set; }
}
