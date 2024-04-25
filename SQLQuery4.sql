CREATE TABLE Employees (
    empId INT IDENTITY(1,1) PRIMARY KEY,
    employee_name VARCHAR(100),
    employee_email VARCHAR(100),
    employee_phone VARCHAR(20),
    employee_password VARCHAR(50),
    managerId INT,
    isAdmin BIT DEFAULT 0,
    FOREIGN KEY (managerId) REFERENCES Employees(empId)
);


CREATE TABLE LeaveRequests (
    id INT IDENTITY(1,1) PRIMARY KEY,
    emp_id INT,
    mng_id INT,
    mng_email VARCHAR(50),
    from_date DATE,
    to_date DATE,
    total_days FLOAT,
    reason_for_leave VARCHAR(200),
    leave_status VARCHAR(50),
    from_leave_shift VARCHAR(50),
    to_leave_shift VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emp_id) REFERENCES Employees(empId),
    FOREIGN KEY (mng_id) REFERENCES Employees(empId)
);


-- Adding records to the Employees table
INSERT INTO Employees (employee_name, employee_email, employee_phone, employee_password, managerId, isAdmin)
VALUES
    ('John Doe', 'john@example.com', '1234567890', 'password123', NULL, 0),
    ('Jane Smith', 'jane@example.com', '9876543210', 'password456', 1, 0),
    ('Michael Scott', 'michael@example.com', '5555555555', 'password789', 1, 1);
	-- Adding more records to the Employees table
INSERT INTO Employees (employee_name, employee_email, employee_phone, employee_password, managerId, isAdmin)
VALUES
    ('Alice Johnson', 'alice@example.com', '1112223333', 'password789', 2, 0),
    ('Bob Smith', 'bob@example.com', '4445556666', 'password101', 1, 0),
    ('Emma Watson', 'emma@example.com', '7778889999', 'password202', 3, 0);


-- Adding records to the LeaveRequests table
INSERT INTO LeaveRequests (emp_id, mng_id, mng_email, from_date, to_date, total_days, reason_for_leave, leave_status, from_leave_shift, to_leave_shift)
VALUES
    (1, 2, 'jane@example.com', '2024-04-20', '2024-04-22', 3, 'Vacation', 'Approved', 'FirstHalf', 'SecondHalf'),
    (2, 1, 'john@example.com', '2024-04-25', '2024-04-27', 3, 'Family emergency', 'Pending', 'FirstHalf', 'FirstHalf'),
  
select * from Employees
select * from LeaveRequests

