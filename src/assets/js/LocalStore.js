
export function get(key) {
    return window.localStorage.getItem(key)    
}

export function set(key, value) {
    window.localStorage.setItem(key, value)
}

export function remove(key) {
    window.localStorage.removeItem(key)
}

export function getObject(key) {
    const json = window.localStorage.getItem(key)
    if(json) {
        return JSON.parse(json)
    }
}

export function setObject(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}
