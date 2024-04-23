
const LEAVE_REQUEST_URL =' http://localhost:3000/LeaveRequests'

export async function getLeaveRequest(){
    const res = await fetch(LEAVE_REQUEST_URL);
    const data = res.json();
    return data
}