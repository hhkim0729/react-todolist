import React, { useState, useRef, useEffect, memo } from 'react';
import './AddForm.css';

const AddForm = memo(({ addTodo }) => {
  const [value, setValue] = useState('');
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
    setValue('');
  }, [addTodo]);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="add-form">
      <input ref={input} value={value} onChange={onChangeInput} />
      <button type="submit" onClick={addTodo(value)}>
        add
      </button>
    </form>
  );
});

export default AddForm;
