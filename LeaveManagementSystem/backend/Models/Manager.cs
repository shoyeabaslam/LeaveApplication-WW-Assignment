using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Manager
{
    public string MngEmail { get; set; } = null!;

    public string? MngName { get; set; }

    public string? MngPhone { get; set; }

    public string? MngPassword { get; set; }

    public bool? IsAdmin { get; set; }

    public virtual ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();
}
