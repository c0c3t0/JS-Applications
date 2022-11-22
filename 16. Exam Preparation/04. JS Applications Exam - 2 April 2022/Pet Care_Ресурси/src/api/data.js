import * as api from "./api.js";

const endpoint = {
    'catalog': 'data/pets?sortBy=_createdOn%20desc&distinct=name',
    'create': 'data/pets',
    'getById': 'data/pets/',
    'donation': 'data/donation',
    'totalDonations': (petId) => `data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    'donationsByUser': (petId, userId) => `data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

export async function donate(data){
    const result = await api.post(endpoint.donation, data);
    return result;
}

export async function getTotalCount(petId){
    const result = await api.get(endpoint.totalDonations(petId));
    return result;
}

export async function isDonate(petId, userId){
    const result = await api.get(endpoint.donationsByUser(petId, userId));
    return result;
}
