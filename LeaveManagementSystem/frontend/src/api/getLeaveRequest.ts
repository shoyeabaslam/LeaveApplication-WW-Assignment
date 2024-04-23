
const GET_URL = 'https://localhost:7096/api/LeaveRequests';


export async function getLeaveRequest(empEmail:string){
    const url = `${GET_URL}/${empEmail}`
    const res = await fetch(url);
    return res
}