import { LeaveType } from "./LeaveRequestType";

export interface CancelPropsTypes{
    setIsCancelPopup:(prev:boolean)=>void,
    setLeaveRequest:React.Dispatch<React.SetStateAction<LeaveType[]>>
    currentId:number,
    leaveRequests:LeaveType[]
}