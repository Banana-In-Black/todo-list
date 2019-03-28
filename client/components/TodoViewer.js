import React, { useState, useCallback } from 'react';
import TodoDetail from './TodoDetail';
import dateformat from 'dateformat';

const TodoViewer = ({ todo, todoOperation }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = useCallback(() => setOpen(isOpen => !isOpen), [setOpen]);

    return (
        <li className="clickable" onClick={toggleOpen}>
            <div>Summary: {todo.summary}</div>
            <div>Start Date: {dateformat(todo.start, 'yyyy-mm-dd')}</div>
            <div>End Date: {dateformat(todo.end, 'yyyy-mm-dd')}</div>
            {isOpen && <TodoDetail id={todo.id} todoOperation={todoOperation} />}
        </li>
    );
};

export default React.memo(TodoViewer);