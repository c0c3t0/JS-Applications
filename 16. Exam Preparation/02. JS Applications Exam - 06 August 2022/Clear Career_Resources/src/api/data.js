import * as api from "./api.js";

const endpoint = {
    'catalog': 'data/offers?sortBy=_createdOn%20desc',
    'create': 'data/offers',
    'getById': 'data/offers/',
    'application': 'data/applications',
    'totalApplications': (offerId) => `data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    'applicationsByUser': (offerId, userId) => `data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function createItem(data){
    const result = await api.post(endpoint.create, data);
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

export async function apply(data){
    const result = await api.post(endpoint.application, data);
    return result;
}

export async function getTotalCount(offerId){
    const result = await api.get(endpoint.totalApplications(offerId));
    return result;
}

export async function applied(offerId, userId){
    const result = await api.get(endpoint.applicationsByUser(offerId, userId));
    return result;
}
