export const get = (k) => JSON.parse(localStorage.getItem(k))
export const getAsync = (k) => new Promise(resolve => resolve(get(k)))

export const set = (k, v) => localStorage.setItem(k, JSON.stringify(v))
export const setAsync = (k, v) => new Promise(resolve => resolve(set(k, v)))
