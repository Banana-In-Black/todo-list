import React, { useState, useEffect, useMemo } from 'react';
import Todo from './Todo';
import TodoEditor from './TodoEditor';
import { get } from 'lodash-es';
import * as todoApi from '../api/todo';

const todoOperation = setter => {
    const add = todo => setter(
        todoList => [...todoList, todo]);
    const update = todo => setter(
        todoList => {
            const todoId = todo.id;
            const index = todoList.findIndex(todo => todo.id === todoId);
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
        });
    const remove = todo => setter(
        todoList => {
            const deletedTodoId = get(todo, 'id');
            const newTodoList = todoList.filter(todo => todo.id !== deletedTodoId);
            return newTodoList.length !== todoList.length
                ? newTodoList
                : todoList;
        });

    return {
        add: todo => todoApi.add(todo).then(add),
        get: id => todoApi.get(id),
        update: todo => todoApi.update(todo).then(update),
        remove: id => todoApi.remove(id).then(remove)
    };
};

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const todoOp = useMemo(() => todoOperation(setTodoList), [setTodoList]);

    useEffect(() => todoApi.list().then(
        res => setTodoList(res.body))
    , [setTodoList]);
    return (
        <React.Fragment>
            <TodoEditor action={todoOp.add} submitText="Add"/>
            <ol>
                {!!todoList.length && todoList.map(todo =>
                    <Todo key={todo.id} todo={todo} todoOperation={todoOp} />)}
            </ol>
        </React.Fragment>
    );
};

export default React.memo(TodoList);