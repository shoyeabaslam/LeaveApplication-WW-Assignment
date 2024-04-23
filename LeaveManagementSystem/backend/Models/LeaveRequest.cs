using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class LeaveRequest
{
    public int Id { get; set; }

    public string? EmpEmail { get; set; }

    public string? MngEmail { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }

    public double? TotalDays { get; set; }

    public string? ReasonForLeave { get; set; }

    public string? LeaveStatus { get; set; }

    public virtual Employee? EmpEmailNavigation { get; set; }

    public virtual Manager? MngEmailNavigation { get; set; }
}
