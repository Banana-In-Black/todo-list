import request from 'superagent';

export const list = () => request.get('/todo');
export const add = todo => request.post('/todo').send(todo);
export const update = todo => request.put('/todo').send(todo);
export const remove = id => request.delete(`/todo/${id}`);