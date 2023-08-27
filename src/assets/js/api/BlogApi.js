
import axios from "../Request";


export function insertOrUpdate(data) {
    return axios.post('/blog/api/v1/note', data)
}

export function getIndex(page) {
    return axios.get('/blog/api/v1/note/index?page=' + page)
}

export function deleteById(id) {
    return axios.post('/blog/api/v1/note/delete?id=' + id)
}

export function getById(id) {
    return axios.get('/blog/api/v1/note/get?id=' + id)
}

export function search(keyword) {
    return axios.get('/blog/api/v1/note/search?keyword=' + keyword)
}