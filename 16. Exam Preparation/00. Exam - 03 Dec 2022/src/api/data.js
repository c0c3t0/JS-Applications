import * as api from "./api.js";

const endpoints = {
    'catalog': 'data/albums?sortBy=_createdOn%20desc',
    'create': 'data/albums',
    'getById': 'data/albums/',

    'likeIt': 'data/likes',
    'totalLikes': (albumId) => `data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    'likeByUser': (albumId, userId) => `data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function createItem(data){
    const result = await api.post(endpoints.create, data);
    return result;
}

export async function getAllItems(){
    const result = await api.get(endpoints.catalog);
    return result;
}

export async function getById(id){
    const result = await api.get(endpoints.getById + id);
    return result;
}

export async function updateById(id, data){
    const result = await api.put(endpoints.getById + id, data);
    return result;
}

export async function deleteById(id){
    const result = await api.del(endpoints.getById + id);
    return result;
}

export async function addLike(data){
    const result = await api.post(endpoints.likeIt, data);
    return result;
}

export async function getTotalCount(albumId){
    const result = await api.get(endpoints.totalLikes(albumId));
    return result;
}

export async function liked(albumId, userId){
    const result = await api.get(endpoints.likeByUser(albumId, userId));
    return result;
}
