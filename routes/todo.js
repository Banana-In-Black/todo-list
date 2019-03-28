const express = require('express');
const router = express.Router();
const { listEvents, insertEvent, updateEvent, deleteEvent } = require('../googleapis/calendar/event');

let todoList = [];

const event2TodoAdapter = event => ({
    id: event.id,
    created: event.created,
    summary: event.summary,
    desc: event.description,
    start: event.start.date,
    end: event.end.date
});

const todo2EventAdapter = todo => ({
    id: todo.id,
    created: todo.created,
    summary: todo.summary,
    description: todo.desc,
    start: { date: todo.start },
    end: { date: todo.end }
});

const handleErr = (res, callback) => (err, apiRes) => {
    if (err) {
        console.error('The API returned an error: ' + err);
        res && res.sendStatus(500);
    } else {
        console.log(apiRes);
        callback(apiRes);
    }
};

// Get todo list
const allowedProps = ['id', 'summary', 'start', 'end'];
router.get('/', (req, res) => {
    listEvents(handleErr(null, gRes => {
        const events = gRes.data.items;
        todoList = events.map(event2TodoAdapter);
        res.send(todoList.map(todo => {
            return Object.keys(todo)
            .filter(key => allowedProps.includes(key))
            .reduce((obj, key) => {
                obj[key] = todo[key];
                return obj;
            }, {});
        }));
    }));
});

// Create a todo
router.post('/', (req, res) => {
    const event = todo2EventAdapter(req.body);
    insertEvent(event, handleErr(res, apiRes => {
        const todo = event2TodoAdapter(apiRes.data);
        todoList.push(todo);
        res.send(todo);
    }));
});

// Get a todo by ID
router.get('/:id', (req, res) => res.send(
    todoList.find(todo => todo.id === req.params.id)
));

// Update a todo by ID
router.put('/:id', (req, res) => {
    const event = todo2EventAdapter(req.body);
    updateEvent(event, handleErr(res, apiRes => {
        const todo = event2TodoAdapter(apiRes.data);
        const todoId = todo.id;
        Object.assign(
            todoList.find(todo => todo.id === todoId), todo);
        console.log('Updated todo', todo);
        res.send(todo);
    }));
});

// Delete a todo by ID
router.delete('/:id', (req, res) => {
    const todoId = req.params.id;
    const index = todoList.findIndex(todo => todo.id === todoId);
    if (index > -1) {
        deleteEvent(todoId, handleErr(res, () => {
            const removed = todoList.splice(index, 1);
            res.send(removed[0]);
        }));
    } else {
        res.send(undefined);
    }
});

module.exports = router;