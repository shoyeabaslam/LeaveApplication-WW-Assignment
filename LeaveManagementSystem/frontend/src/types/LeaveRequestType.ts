export interface LeaveType {
    managerId: string,
    managerName: string,
    fromDate: string,
    toDate: string,
    totalDays: string,
    reasonForLeave:string,
    status: 'Pending' | 'Approved' | 'Cancelled'
}

export interface LeaveRequestType{
    leaveRequests: LeaveType[],
    handleCancleLeaveRequest: () => void,
    handleUpdateLeaveRequest: () => void,
    setLeaveRequest:React.Dispatch<React.SetStateAction<LeaveType[]>>
    currentStatus: string,
    searchTerms:string,
}