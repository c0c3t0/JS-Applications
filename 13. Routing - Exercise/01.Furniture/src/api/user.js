import * as api from "./api.js";

const endpoint = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'catalog': 'data/catalog',
    'getById': 'data/catalog/:id',
    'getMyItems': 'data/catalog?where=_ownerId%3D%22',
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

export async function createItem(data){
    const result = await api.post(endpoint.catalog, data);
    return result;
}

export async function getAllItems(){
    const result = await api.get(endpoint.catalog);
    return result;
}

export async function getById(id){
    const result = await api.get(endpoint.getById + id);
    return result;
}

export async function updateById(id, data){
    const result = await api.put(endpoint.getById + id, data);
    return result;
}

export async function deleteById(id){
    const result = await api.del(endpoint.getById + id);
    return result;
}

export async function getMyItems(id){
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user && user._id;
    const id = `${userId}%22`
    const result = await api.get(endpoint.getMyItems + id);
    return result;
}