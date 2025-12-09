import React from 'react';


function Input({ label, type = "text", value, onChange, name, placeholder }) {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
