import React, { useState, useEffect } from 'react';
import './todo.css';
const Todo = ({ id, title, completed, onDelete, onUpdate }) => {
    const MaxLength = 100;

    useEffect(() => {
        if (id === 'new') {
            editTask(undefined);
        }
    }, [id]);

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.target.blur();
        }
        if (e.target.innerText.length > MaxLength && e.keyCode !== 8 && e.keyCode !== 46) {
            e.preventDefault();
        }
    }
    const updateTaskStatus = () => {
        const updatedTodo = {
            id: id,
            task: title,
            completed: !completed,
        };
        onUpdate(updatedTodo);
    }

    const editTask = (e) => {
        const titleElement = document.querySelector(`#todo-${id} .task-title`);
        titleElement.setAttribute('contenteditable', true);
        // if (id != 'new') {
        //     range.setStart(titleElement.childNodes[0], title.length);
        //     range.collapse(true);
        //     sel.removeAllRanges();
        //     sel.addRange(range);
        // }
        titleElement.focus();
    }

    const onBlur = (e) => {
        e.target.removeAttribute('contenteditable')
        const updatedTitle = e.target.innerText;
        if (updatedTitle !== title) {
            const updatedTodo = {
                id: id,
                task: updatedTitle,
                completed: completed,
            };
            onUpdate(updatedTodo);
        }
        if (updatedTitle == '') {
            onTaskDelete(e);
        }
    }
    const onTaskDelete = (e) => {
        const todo = document.querySelector(`#todo-${id}`);
        
        todo.onanimationend = () => {
            onDelete(e, id);
        }
        todo.classList.add('blur-on-delete');

    }
    return (
        <div className="todo" id={`todo-${id}`}>
            <span className={completed ? 'task-status done' : 'task-status incomplete'} onClick={updateTaskStatus} id={`task-status-${id}`}></span>
            <span spellCheck="false" className="task-title" onBlur={onBlur} onKeyDown={onKeyDown} onClick={editTask}>{title}</span>
            {/* <span className="task-edit-btn" onClick={editTask}>&#9998;</span> */}
            <span className="task-delete-btn" onClick={onTaskDelete}>&#10007;</span>
        </div>
    );
};

export default Todo;