import React, { useState, useCallback } from 'react';
import request from 'superagent';
import dateformat from 'dateformat';

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
            .send({
                ...formState,
                start: formState.start || dateformat(new Date(), 'yyyy-mm-dd'),
                end: formState.end || dateformat(new Date(), 'yyyy-mm-dd')
            })
            .then(res => {
                addTodo(res.body);
                // clear form
                setFormState({
                    summary: '',
                    start: '',
                    end: '',
                    desc: ''
                });
            });
    }, [formState, setFormState]);
    return (
        <form onSubmit={onSubmit}>
            Summary: <input name="summary" value={formState.summary} onChange={handleChange} /><br />
            Start Date: <input type="date" name="start" value={formState.start} onChange={handleChange} /><br />
            End Date: <input type="date" name="end" value={formState.end} onChange={handleChange} /><br />
            Desc: <textarea name="desc" value={formState.desc} onChange={handleChange} /><br />
            <button type="submit">Add</button>
        </form>
    );
};

export default React.memo(CreateTodo);