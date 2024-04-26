export interface EmployeeDetailsType{
    empId: number,
    employeeEmail: string,
    employeeName: string,
    employeePassword: string,
    employeePhone: string,
    managerId:number,
    isManager?:false,
    isAdmin?: boolean
}