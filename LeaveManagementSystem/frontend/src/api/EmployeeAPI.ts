
const BASE_URL = 'http://localhost:5106/api/Employees'

export async function getEmployeeById(id:number){
    const url = `${BASE_URL}/${id}`
    const res = await fetch(url);
    return res
}