import React from 'react';

const Dropdown = ({ items, defaultValue }) => {
console.log(defaultValue)
  return (
    <select defaultValue={defaultValue}>
      {items.map(({ label, value }) => (
    <option key={value} value={value} >
      {label}
    </option>
  ))}
    </select>
  );
}

export default Dropdown;
