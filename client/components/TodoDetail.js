import React, { useState, useEffect } from 'react';
import request from 'superagent';
import dateformat from 'dateformat';

const TodoDetail = ({ id }) => {
    const [todo, setTodo] = useState({});

    useEffect(() => {
        request
            .get(`/todo/${id}`)
            .then(res => setTodo(res.body));
    }, [id]);
    
    return (
        <div className="todo-detail">
            <div>Description: {todo.desc}</div>
            <div>Created: {todo.created && dateformat(todo.created, 'fullDate')}</div>
        </div>
    );
};

export default React.memo(TodoDetail);