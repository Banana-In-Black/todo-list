import request from 'superagent';

let base = '';

export const setBase = b => (base = b);
export const list = () => request.get(`${base}/todo`).then(res => res.body);
export const add = todo => request.post(`${base}/todo`).send(todo).then(res => res.body);
export const get = id => request.get(`${base}/todo/${id}`).then(res => res.body);
export const update = todo => request.put(`${base}/todo/${todo.id}`).send(todo).then(res => res.body);
export const remove = id => request.delete(`${base}/todo/${id}`).then(res => res.body);