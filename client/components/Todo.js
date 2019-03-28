import React, { useState } from 'react';
import TodoEditor from './TodoEditor';
import TodoViewer from './TodoViewer';

const Todo = ({ todo, removeTodo, updateTodo }) => {
    const [isEditing, setEditing] = useState(false);
    //TOFIX

    return isEditing
        ? <TodoEditor todo={todo} updateTodo={updateTodo} />
        : <TodoViewer todo={todo} removeTodo={removeTodo} />;
};

export default React.memo(Todo);