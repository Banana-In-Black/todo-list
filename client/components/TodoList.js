import React, { useState, useEffect, useCallback } from 'react';
import Todo from './Todo';
import TodoEditor from './TodoEditor';
import request from 'superagent';
import { get } from 'lodash-es';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        request
            .get('/todo')
            .then(res => setTodoList(res.body));
    }, [setTodoList]);

    const addTodo = useCallback(todo => {
        return request
            .post('/todo')
            .send(todo)
            .then(res => 
                setTodoList(todoList => [...todoList, res.body]));
    }, [setTodoList]);

    const updateTodo = useCallback(todo => setTodoList(todoList => {
        const todoId = todo.id;
        const index = todoList.findIndex(todo => todo.id !== todoId);
        if (index > -1) {
            return [
                ...todoList.slice(0, index),
                {
                    ...todoList[index],
                    ...todo
                },
                ...todoList.slice(index + 1)
            ];
        } else {
            return todoList;
        }
    }), [setTodoList]);

    const removeTodo = useCallback(id => {
        return request
            .delete(`/todo/${id}`)
            .then(res => {
                setTodoList(todoList => {
                    const deletedTodoId = get(res.body, 'id');
                    const newTodoList = todoList.filter(todo => todo.id !== deletedTodoId);
                    return newTodoList.length !== todoList.length
                        ? newTodoList
                        : todoList;
                });
            });
    }, [setTodoList]);
    return (
        <React.Fragment>
            <TodoEditor addTodo={addTodo} />
            <ol>
                { !!todoList.length && todoList.map(todo =>
                    <Todo key={todo.id} todo={todo} updateTodo={updateTodo} removeTodo={removeTodo} />) }
            </ol>
        </React.Fragment>
    );
};

export default React.memo(TodoList);