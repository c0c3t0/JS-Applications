import * as api from "./api.js";

const endpoint = {
    'catalog': 'data/posts?sortBy=_createdOn%20desc',
    'create': 'data/posts',
    'getItemById': 'data/posts/',
    'ownerItems': (userId) => `data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    'makeDonation': 'data/donations',
    'totalDonations': (postId) => `data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    'applicationsByUser': (postId, userId) => `data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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
    const result = await api.get(endpoint.getItemById + id);
    return result;
}

export async function updateById(id, data){
    const result = await api.put(endpoint.getItemById + id, data);
    return result;
}

export async function deleteById(id){
    const result = await api.del(endpoint.getItemById + id);
    return result;
}

export async function getMyItems(userId){
    const result = await api.get(endpoint.ownerItems(userId));
    return result;
}

export async function donate(data){
    const result = await api.post(endpoint.makeDonation, data);
    return result;
}

export async function getTotalCount(postId){
    const result = await api.get(endpoint.totalDonations(postId));
    return result;
}

export async function donateByUser(postId, userId){
    const result = await api.get(endpoint.applicationsByUser(postId, userId));
    return result;
}
