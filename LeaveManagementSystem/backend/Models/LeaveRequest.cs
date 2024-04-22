using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class LeaveRequest
{
    public int RequestId { get; set; }

    public int? EmpId { get; set; }

    public string? EmpName { get; set; }

    public string? EmpPhone { get; set; }

    public string? ManagerEmail { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }

    public decimal? TotalDays { get; set; }

    public string? Reason { get; set; }

    public string? Status { get;set }
}
