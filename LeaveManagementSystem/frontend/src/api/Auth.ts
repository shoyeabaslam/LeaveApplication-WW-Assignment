import { LoginType } from "../types/LoginType";

// const LOGIN_URL = 'https://localhost:7231/Login'
// const MANAGER_URL = 'https://localhost:7231/ManagerLogin'

const LOGIN_URL = 'http://localhost:5106/Login'
const MANAGER_URL = 'http://localhost:5106/ManagerLogin'
// const PC_URL = 'http://localhost:5106/Login'

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

export async function mangerLogin(data:LoginType){
    const res = await fetch(MANAGER_URL,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return res;
}