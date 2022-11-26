import * as api from "./api.js";

const endpoint = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
}

export async function login(username, password) {
    const user = await api.post(endpoint.login, { username, password });
    sessionStorage.setItem('user',JSON.stringify(user));
}

export async function register(username, password){
    const user = await api.post(endpoint.register, {username, password});
    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
    api.get(endpoint.logout);
    sessionStorage.removeItem('user');
}
