import { LeaveType } from "./LeaveRequestType";

export interface CancelPropsTypes{
    setIsCancelPopup:(prev:boolean)=>void,
    currentId:number,
    leaveRequests:LeaveType[]
}