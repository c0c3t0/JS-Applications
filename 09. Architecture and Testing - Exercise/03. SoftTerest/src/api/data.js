import * as api from "./api.js";


const endpoints = {
    'getIdeas': 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdea': 'data/ideas'
}

export async function getIdeas(){
    return api.get(endpoints.getIdeas);
}

export async function createIdea(data){
    return api.post(endpoints.createIdea, data)
}