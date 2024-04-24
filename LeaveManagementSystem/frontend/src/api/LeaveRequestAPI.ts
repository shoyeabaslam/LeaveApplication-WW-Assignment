import { LeaveType } from "../types/LeaveRequestType";

const BASE_URL = 'https://localhost:7231/api/LeaveRequests';

export async function postLeaveRequest(body: LeaveType) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return res;
}


export async function getLeaveRequest(empId:number){
    const url = `${BASE_URL}/${empId}`
    const res = await fetch(url);
    return res
}


export async function updateLeaveRequest(data:LeaveType,id:number){
    const url = `${BASE_URL}/${id}`
    const res = fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res
}