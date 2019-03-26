import React, { useState, useEffect, useCallback } from 'react';
import request from 'superagent';
import Todo from './Todo';
import CreateTodo from './CreateTodo';

const Root = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        request
            .get('/todo')
            .then(res => setTodoList(res.body));
    }, [setTodoList]);

    const addTodo = useCallback(todo => setTodoList(todoList =>
        [...todoList, todo]), [setTodoList]);
    const removeTodo = useCallback(id => setTodoList(todoList => {        
        const newTodoList = todoList.filter(todo => todo.id !== id);
        if (newTodoList.length !== todoList.length) {
            return newTodoList;
        } else {
            return todoList;
        }
    }), [setTodoList]);
    return (
        <React.Fragment>
            <CreateTodo addTodo={addTodo} />
            <ol>
                { !!todoList.length && todoList.map(todo =>
                    <Todo key={todo.id} todo={todo} removeTodo={removeTodo} />) }
            </ol>
        </React.Fragment>
    );
};

export default Root;