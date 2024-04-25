import { LoginType } from "../types/LoginType";

const LOGIN_URL = 'https://localhost:7231/Login'

export async function login(data:LoginType){
    const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
}