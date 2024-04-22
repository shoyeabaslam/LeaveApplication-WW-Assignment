CREATE TABLE Employees (
    EMP_ID INT PRIMARY KEY,
    EMP_NAME NVARCHAR(255) NOT NULL,
    EMP_EMAIL NVARCHAR(255) NOT NULL,
    EMP_PASS NVARCHAR(255) NOT NULL,
    TOTAL_LEAVE INT DEFAULT 20
);

CREATE TABLE Managers (
    M_ID INT PRIMARY KEY,
    M_NAME NVARCHAR(255) NOT NULL,
    M_EMAIL NVARCHAR(255) NOT NULL,
    M_PASS NVARCHAR(255) NOT NULL,
    ISADMIN BIT 
);

CREATE TABLE LeaveRequests (
    RequestID INT PRIMARY KEY IDENTITY(1,1),
    EmpId INT,
    EmpName NVARCHAR(255),
    EmpPhone NVARCHAR(20),
    ManagerEmail NVARCHAR(255),
    FromDate DATETIME,
    ToDate DATETIME,
    TotalDays AS 
        DATEDIFF(DAY, FromDate, ToDate) +
        CASE 
            WHEN CAST(FromDate AS TIME) < '09:30' THEN
                CASE 
                    WHEN CAST(ToDate AS TIME) >= '14:00' THEN 1
                    ELSE 0.5
                END
            WHEN CAST(FromDate AS TIME) >= '09:30' AND CAST(FromDate AS TIME) < '14:00' THEN
                CASE 
                    WHEN CAST(ToDate AS TIME) >= '14:00' THEN 0.5
                    ELSE 0
                END
            ELSE 0
        END,
    Reason NVARCHAR(MAX)
);



INSERT INTO LeaveRequests (EmpId, EmpName, EmpPhone, ManagerEmail, FromDate, ToDate, Reason)
VALUES
    (1, 'John Doe', '1234567890', 'manager1@example.com', '2024-12-31 08:00:00', '2025-01-05 12:00:00', 'Vacation'),
    (2, 'Jane Smith', '0987654321', 'manager2@example.com', '2024-04-10 12:00:00', '2024-04-15 17:00:00', 'Family event'),
    (3, 'Alice Johnson', '4567890123', 'manager1@example.com', '2024-04-20 08:30:00', '2024-04-25 16:30:00', 'Sick leave'),
    (4, 'Bob Brown', '9876543210', 'manager2@example.com', '2024-04-05 07:45:00', '2024-04-10 14:30:00', 'Personal reasons'),
    (5, 'Emily Davis', '3210987654', 'manager1@example.com', '2024-04-15 10:00:00', '2024-04-20 18:00:00', 'Vacation');

select DATEDIFF(DAYOFYEAR,FromDate , ToDate) as date from LeaveRequests 
select * from LeaveRequests where todate like '2025-01-05 12:00:00'
select * from LeaveRequests


SELECT YEAR(ToDate) AS LeaveYear, COUNT(*) AS TotalLeaveRequests
FROM LeaveRequests
GROUP BY YEAR(ToDate)
ORDER BY LeaveYear;

