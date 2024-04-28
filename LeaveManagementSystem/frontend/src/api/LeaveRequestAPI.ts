import { LeaveType } from "../types/LeaveRequestType";

// const BASE_URL = 'https://localhost:7231/api/LeaveRequests';
const BASE_URL = 'http://localhost:5106/api/LeaveRequests';
// const PC_URL = 'http://localhost:5106/api/LeaveRequests'
export async function postLeaveRequest(body: LeaveType) {
    console.log(body)
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


export async function updateRequest(data:LeaveType,id:number){
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

export async function getLeaveRequestByMngId(mngId:number){
    // https://localhost:7231/api/LeaveRequests/Manager

    const url = `${BASE_URL}/Manager/${mngId}`
    const res = await fetch(url)
    return res
}