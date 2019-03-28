import request from 'superagent';

export const list = () => request.get('/todo');
export const add = todo => request.post('/todo').send(todo).then(res => res.body);
export const get = id => request.get(`/todo/${id}`).then(res => res.body);
export const update = todo => request.put(`/todo/${todo.id}`).send(todo).then(res => res.body);
export const remove = id => request.delete(`/todo/${id}`).then(res => res.body);