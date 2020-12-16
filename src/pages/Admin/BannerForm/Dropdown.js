import React from 'react';

const Dropdown = ({ items, defaultValue, styleChange }) => {
  return (
    <select value={defaultValue} onChange={styleChange}>
      {items.map(({ label, value }) => (
    <option key={value} value={value} >
      {label}
    </option>
  ))}
    </select>
  );
}

export default Dropdown;
