import React, { useState, useCallback } from 'react';
import request from 'superagent';

const CreateTodo = ({ addTodo }) => {
    const [formState, setFormState] = useState({});
    const handleChange = useCallback(e => {
        const target = e.target;
        setFormState(formState=> ({
            ...formState,
            [target.name]: target.value
        }));
    }, [setFormState]);
    const onSubmit = useCallback(e => {
        e.preventDefault();
        request
            .post('/todo')
            .send(formState)
            .then(res => {
                addTodo(res.body);
                setFormState({
                    summary: '',
                    date: '',
                    desc: ''
                });
            });
    }, [formState, setFormState]);
    return (
        <form onSubmit={onSubmit}>
            Summary: <input name="summary" value={formState.summary} onChange={handleChange} /><br />
            Date: <input type="date" name="date" value={formState.date} onChange={handleChange} /><br />
            Desc: <textarea name="desc" value={formState.desc} onChange={handleChange} /><br />
            <button type="submit">Add</button>
        </form>
    );
};

export default React.memo(CreateTodo);