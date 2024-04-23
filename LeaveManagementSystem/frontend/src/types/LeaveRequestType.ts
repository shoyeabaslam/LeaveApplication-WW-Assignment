export interface LeaveType {
    id?:number,
    empEmail:string,
    mngEmail: string,
    fromDate: string,
    toDate: string,
    totalDays: string,
    reasonForLeave:string,
    leaveStatus: 'Pending' | 'Approved' | 'Cancelled',
    [key:string]:string | number | undefined,
}

export interface LeaveRequestType{
    leaveRequests: LeaveType[],
    handleCancleLeaveRequest: (id:number) => void,
    handleUpdateLeaveRequest: (id:number) => void,
    setLeaveRequest:React.Dispatch<React.SetStateAction<LeaveType[]>>
    currentStatus: string,
    searchTerms:string,
}