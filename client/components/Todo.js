import React, { useState, useCallback } from 'react';
import request from 'superagent';
import dateformat from 'dateformat';
import TodoDetail from './TodoDetail';
import { get } from 'lodash-es';

const Todo = ({ todo, removeTodo }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = useCallback(() => setOpen(isOpen => !isOpen), [setOpen]);
    const onClick = useCallback(e => {
        e.stopPropagation();
        request
            .delete(`/todo/${todo.id}`)
            .then(res => removeTodo(get(res.body, 'id')));
    }, [removeTodo]);
    return (
        <li className="clickable" onClick={toggleOpen}>
            <div>Summary: {todo.summary}</div>
            <div>Start Date: {dateformat(todo.start, 'fullDate')}</div>
            <div>End Date: {dateformat(todo.end, 'fullDate')}</div>
            {isOpen && <TodoDetail id={todo.id} />}
            <button onClick={onClick}>Delete</button>
        </li>
    );
};

export default React.memo(Todo);