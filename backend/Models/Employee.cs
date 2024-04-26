using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public partial class Employee
    {
        public int EmpId { get; set; }
        public string? EmployeeName { get; set; }
        public string? EmployeeEmail { get; set; }
        public string? EmployeePhone { get; set; }
        public string? EmployeePassword { get; set; }
        public int? ManagerId { get; set; }
        public bool? IsAdmin { get; set; }

        // Navigation properties
       
      

    }
}
