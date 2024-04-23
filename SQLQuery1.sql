CREATE TABLE Employees (
    id INT IDENTITY(1,1) PRIMARY KEY,
    emp_id AS 'EMP' + FORMAT(id, '000'),
    emp_name varchar(50),
    emp_phone varchar(50),
    emp_email varchar(50) UNIQUE,
    emp_password varchar(50)
)

CREATE TABLE Managers (
    mng_email varchar(50) PRIMARY KEY,
    mng_name varchar(50),
    mng_phone varchar(50),
    mng_password varchar(50),
    is_admin bit
)

CREATE TABLE LeaveRequests (
    id int identity(1,1) primary key,
    employee_id int references Employees,
    manager_email varchar(50) references Managers,
    from_date datetime,
    to_date datetime,
    total_days float,
    reason_for_leave varchar(200),
    leave_status varchar(50)
)

-- Sample data for Employees table
INSERT INTO Employees
VALUES ('John Doe', '123-456-7890', 'john@example.com', 'password123'),
       ('Jane Smith', '987-654-3210', 'jane@example.com', 'password456');

-- Sample data for Managers table
INSERT INTO Managers 
VALUES ('manager1@example.com', 'Manager One', '111-222-3333', 'managerpass', 1),
       ('manager2@example.com', 'Manager Two', '444-555-6666', 'managerpass', 0);

-- Sample data for LeaveRequests table
INSERT INTO LeaveRequests 
VALUES (1,'manager1@example.com', '2024-04-20', '2024-04-22', '3', 'Vacation', 'Approved'),
       (1,'manager2@example.com', '2024-04-25', '2024-04-27', '3', 'Family emergency', 'Pending');


select * from Employees
select * from Managers
select * from LeaveRequests

drop table Employee
