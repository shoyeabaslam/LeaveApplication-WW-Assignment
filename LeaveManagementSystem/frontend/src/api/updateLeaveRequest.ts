import { LeaveType } from "../types/LeaveRequestType";

const PUT_BASE_URL = 'https://localhost:7096/api/LeaveRequests';


export async function updateLeaveRequest(data:LeaveType,id:number){
    const url = `${PUT_BASE_URL}/${id}`
    const res = fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res
}