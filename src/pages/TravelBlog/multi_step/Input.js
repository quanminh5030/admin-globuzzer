import React from "react";

export default function Input({
  className,
  type = "text",
  name,
  value,
  placeholder = null,
  onChange,
  error,
  label = null,
}) {
  return (
    <div className={className}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder || name}
        onChange={onChange}
      />

      {label && <label>{label}</label>}

      {error && <p className="error">{error[name]}</p>}
    </div>
  );
}
