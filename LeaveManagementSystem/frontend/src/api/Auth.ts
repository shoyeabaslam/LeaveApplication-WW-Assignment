import { LoginType } from "../types/LoginType";

const LOGIN_URL = 'https://localhost:7231/Login'
const PC_URL = 'http://localhost:5106/Login'

export async function login(data:LoginType){
    const res = await fetch(PC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
}