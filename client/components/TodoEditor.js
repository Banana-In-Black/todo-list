import React, { useState, useCallback } from 'react';
import dateformat from 'dateformat';

const initFormState = {
    summary: '',
    desc: '',
    start: dateformat(new Date(), 'yyyy-mm-dd'),
    end: dateformat(new Date(), 'yyyy-mm-dd')
};

const TodoEditor = ({ todo, action, onSubmit, submitText }) => {
    const [formState, setFormState] = useState(todo || initFormState);

    const handleChange = useCallback(e => {
        const target = e.target;
        setFormState(formState=> ({
            ...formState,
            [target.name]: target.value
        }));
    }, [setFormState]);

    const submitAction = useCallback(e => {
        e.preventDefault();

        const todo = {
            ...formState,
            start: formState.start || dateformat(new Date(), 'yyyy-mm-dd'),
            end: formState.end || dateformat(new Date(), 'yyyy-mm-dd')
        };
        const promise = action(todo)
            .then(() => setFormState(initFormState));
        onSubmit && onSubmit(promise);
    }, [formState, setFormState, action, onSubmit]);
    return (
        <form onSubmit={submitAction}>
            Summary: <input name="summary" value={formState.summary} onChange={handleChange} /><br />
            Start Date: <input type="date" name="start" value={formState.start} onChange={handleChange} /><br />
            End Date: <input type="date" name="end" value={formState.end} onChange={handleChange} /><br />
            Desc: <textarea name="desc" value={formState.desc} onChange={handleChange} /><br />
            <button type="submit">{submitText}</button>
        </form>
    );
};

export default React.memo(TodoEditor);