import React, { useState, useEffect } from 'react';
import dateformat from 'dateformat';

const TodoDetail = ({ id, todoOperation }) => {
    const [todo, setTodo] = useState({});

    useEffect(() => {
        todoOperation.get(id).then(setTodo);
    }, [id, todoOperation, setTodo]);
    
    return (
        <div className="todo-detail">
            <div>Description: {todo.desc}</div>
            <div>Created: {todo.created && dateformat(todo.created, 'fullDate')}</div>
        </div>
    );
};

export default React.memo(TodoDetail);