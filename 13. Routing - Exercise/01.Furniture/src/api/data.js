import * as api from "./api.js";


const endpoints = {
    'getIdeas': 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdea': 'data/ideas',
    'ideaById': 'data/ideas/',
}

export async function getIdeas(){
    return api.get(endpoints.getIdeas);
}

export async function createIdea(data){
    return api.post(endpoints.createIdea, data);
}

export async function getIdeaById(id) {
    return api.get(endpoints.ideaById + id);
}

export async function deleteIdea(id) {
    return api.del(endpoints.ideaById + id);
}
