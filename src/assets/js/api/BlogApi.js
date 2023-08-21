
import axios from "../Request";


export function insertOrUpdate(data) {
    return axios.post('/api/v1/note', data)
}

export function getIndex() {
    return axios.get('/api/v1/note/index')
}

export function deleteById(id) {
    return axios.post('/api/v1/note/delete?id=' + id)
}

export function getById(id) {
    return axios.get('/api/v1/note/get?id=' + id)
}

export function search(keyword) {
    return axios.get('/api/v1/note/search?keyword=' + keyword)
}