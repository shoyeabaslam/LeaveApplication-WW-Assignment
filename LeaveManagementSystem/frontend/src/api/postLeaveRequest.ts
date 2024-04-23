import { LeaveType } from "../types/LeaveRequestType";

const POST_URL = 'https://localhost:7096/api/LeaveRequests';

export async function postLeaveRequest(body: LeaveType) {
    const res = await fetch(POST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return res;
}
