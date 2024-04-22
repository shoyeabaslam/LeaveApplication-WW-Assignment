using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Manager
{
    public int MId { get; set; }

    public string MName { get; set; } = null!;

    public string MEmail { get; set; } = null!;

    public string MPass { get; set; } = null!;

    public bool? Isadmin { get; set; }
}
