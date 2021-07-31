import React, { useState, useRef, useEffect, memo } from 'react';
import './Todo.css';

const Todo = memo(
  ({ id, todo, isChecked, deleteTodo, updateTodo, toggleCheck }) => {
    const [value, setValue] = useState(todo);
    const [isUpdate, setIsUpdate] = useState(false);
    const input = useRef(null);

    useEffect(() => {
      if (isUpdate) {
        input.current.focus();
      }
    }, [isUpdate]);

    useEffect(() => {
      setIsUpdate(false);
    }, [todo]);

    const onClickTodo = () => {
      setIsUpdate(true);
    };

    const onChangeInput = (e) => {
      setValue(e.target.value);
    };

    const onFormSubmit = (e) => {
      e.preventDefault();
      setIsUpdate(false);
      if (!value) {
        setValue(todo);
      } else {
        if (todo !== value) {
          updateTodo(id, value, isChecked);
        }
      }
    };

    const onBlurInput = () => {
      setIsUpdate(false);
    };

    const onKeyUpInput = (e) => {
      if (e.key === 'Escape') {
        setIsUpdate(false);
      }
    };

    return (
      <li className="list">
        <span className="check" onClick={toggleCheck(id)}>
          {isChecked ? '◼' : '◻'}
        </span>
        {isUpdate || (
          <span
            className={`todo ${isChecked ? 'checked' : ''}`}
            onClick={onClickTodo}
          >
            {todo}
          </span>
        )}
        {isUpdate && (
          <form className="update-form" onSubmit={onFormSubmit}>
            <input
              ref={input}
              value={value}
              onChange={onChangeInput}
              onBlur={onBlurInput}
              onKeyUp={onKeyUpInput}
            />
          </form>
        )}
        <button onClick={deleteTodo(id)}>X</button>
      </li>
    );
  }
);

export default Todo;
