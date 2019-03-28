import React, { useState, useCallback } from 'react';
import TodoEditor from './TodoEditor';
import TodoViewer from './TodoViewer';

const Todo = ({ todo, todoOperation }) => {
    const [isEditing, setEditing] = useState(false);
    const [todoForEdit, setTodoForEdit] = useState(todo);

    const onUpdated = useCallback(
        promise => promise.then(
            () => setEditing(false)), [setEditing]);

    const toggleEditing = useCallback(value =>
        () => {
            if (value) {
                todoOperation
                    .get(todo.id)
                    .then(todo => {
                        setTodoForEdit(todo);
                        setEditing(value);
                    });
            } else {
                setEditing(value);
            }
        }
    , [setEditing]);
    const toRemoveTodo = useCallback(() => todoOperation.remove(todo.id), [todoOperation]);
    return (
        <React.Fragment>
            {isEditing
                ? <TodoEditor todo={todoForEdit} action={todoOperation.update} onSubmit={onUpdated} submitText="Update" />
                : <TodoViewer todo={todo} todoOperation={todoOperation} />}
            {isEditing
                ? <button onClick={toggleEditing(false)}>Cancel</button>
                : <button onClick={toggleEditing(true)}>Update</button>}
            <button onClick={toRemoveTodo}>Delete</button>
        </React.Fragment>
    );
};

export default React.memo(Todo);