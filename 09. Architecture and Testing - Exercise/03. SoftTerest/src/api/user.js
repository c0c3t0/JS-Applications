import * as api from "./api.js";

const endpoint = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
}

export async function login(email, password) {
    const user = await api.post(endpoint.login, { email, password });
    sessionStorage.setItem('user',JSON.stringify(user));
}

export async function register(email, password){
    const user = await api.post(endpoint.register, {email, password});
    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
    api.get(endpoint.logout);
    sessionStorage.removeItem('user');
}