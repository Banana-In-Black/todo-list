import React, { useState, useCallback } from 'react';
import TodoDetail from './TodoDetail';
import dateformat from 'dateformat';

const TodoViewer = ({ todo, removeTodo }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = useCallback(() => setOpen(isOpen => !isOpen), [setOpen]);

    const toRemoveTodo = useCallback(e => {
        e.stopPropagation();
        removeTodo(todo.id);
    }, [removeTodo]);
    return (
        <li className="clickable" onClick={toggleOpen}>
            <div>Summary: {todo.summary}</div>
            <div>Start Date: {dateformat(todo.start, 'fullDate')}</div>
            <div>End Date: {dateformat(todo.end, 'fullDate')}</div>
            {isOpen && <TodoDetail id={todo.id} />}
            <button onClick={toRemoveTodo}>Delete</button>
        </li>
    );
};

export default React.memo(TodoViewer);