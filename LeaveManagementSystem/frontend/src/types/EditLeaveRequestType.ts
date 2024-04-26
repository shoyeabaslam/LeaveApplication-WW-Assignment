import { LeaveType } from "./LeaveRequestType";

export interface EditLeaveRequestType{
    setIsUpdatePopup:(prev:boolean)=>void,
    currentId:number,
    leaveRequests:LeaveType[],
    setLeaveRequest:React.Dispatch<React.SetStateAction<LeaveType[]>>
}