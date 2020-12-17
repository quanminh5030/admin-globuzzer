import React from 'react';
import style from './BannerForm.module.css';

const Dropdown = ({ items, defaultValue, styleChange }) => {
  return (
    <div className={style.selectdiv}>
      <label>
        <select value={defaultValue} onChange={styleChange}>
          {items.map(({ label, value }) => (
        <option key={value} value={value} >
          {label}
        </option>
        ))};
        </select>
      </label>
    </div>
  );
}

export default Dropdown;
