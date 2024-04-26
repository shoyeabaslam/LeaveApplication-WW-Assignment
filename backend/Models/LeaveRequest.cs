using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class LeaveRequest
{
    public int Id { get; set; }

    public int? EmpId { get; set; }

    public int? MngId { get; set; }

    public string? MngEmail { get; set; }

    public DateOnly? FromDate { get; set; }

    public DateOnly? ToDate { get; set; }

    public double? TotalDays { get; set; }

    public string? ReasonForLeave { get; set; }

    public string? LeaveStatus { get; set; }

    public string? FromLeaveShift { get; set; }

    public string? ToLeaveShift { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Employee? Emp { get; set; }

    public virtual Employee? Mng { get; set; }
}
