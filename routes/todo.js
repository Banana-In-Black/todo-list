const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const todoList = [{
    id: uuid.v4(),
    created: new Date().toISOString(),
    summary: 'Watch Movie',
    date: new Date('2019-03-25').toISOString(),
    desc: 'Gonna watch John Wick II.'
}, {
    id: uuid.v4(),
    created: new Date().toISOString(),
    summary: 'Dinner Date',
    date: new Date('2019-03-26').toISOString(),
    desc: 'Having a dinner date with my girlfriend.'
}];

router.get('/', (req, res) => res.send(todoList));
router.get('/:id', (req, res) => res.send(
    todoList.find(todo => todo.id === req.params.id)
));
router.delete('/:id', (req, res) => {
    const index = todoList.findIndex(todo => todo.id === req.params.id);
    const removed = todoList.splice(index, 1);
    res.send(removed.length ? removed[0] : undefined);
});
router.post('/', (req, res) => {
    const todo = {
        id: uuid.v4(),
        created: new Date().toISOString(),
        ...req.body
    };
    todoList.push(todo);
    res.send(todo);
});

module.exports = router;