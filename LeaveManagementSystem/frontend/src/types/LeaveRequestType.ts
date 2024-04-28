export interface LeaveType {
    id?:number,
    empId:number,
    mngId:number | null,
    mngEmail: string,
    fromDate: string,
    toDate: string,
    totalDays: string,
    reasonForLeave:string,
    fromLeaveShift: string,
    toLeaveShift: string,
    leaveStatus: 'Pending' | 'Approved' | 'Cancelled',
    [key:string]:string | number | undefined | null,
}

export interface LeaveRequestType{
    leaveRequests: LeaveType[],
    handleCancleLeaveRequest: (id:number) => void,
    handleUpdateLeaveRequest: (id:number) => void,
    handleApproval:(id:number)=>void,   
    handleEmployeeViewDetails:(empId:number)=>void,
    setLeaveRequest:React.Dispatch<React.SetStateAction<LeaveType[]>>
    currentStatus: string,
    searchTerms:string,
}