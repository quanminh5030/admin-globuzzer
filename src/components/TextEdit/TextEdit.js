import React, { useEffect, useState } from 'react';
import Dropdown from '../EditDropdown/Dropdown';
import edit from './TextEdit.module.css';
import { sizes, weights, aligns } from './Data';

const TextEdit = ({ currentText, formTextStyle, showForm, save }) => {
  const[fontSizes] = useState(sizes);
  const[fontWeights] = useState(weights);
  const[textAligns] = useState(aligns);
  // set the default values for drop-down lists font size and weight
  const [defaultSize, setDefaultSize] = useState('');
  const [defaultWeight, setDefaultWeight] = useState('');
  const [defaultColor, setDefaultColor] = useState('');
  const [defaultAlign, setDefaultAlign] = useState('');
  useEffect(() => {
    setDefaultSize(currentText.style.fontSize.substring(0, 2, - 1));
    setDefaultWeight(currentText.style.fontWeight);
    setDefaultColor(currentText.style.color);
    setDefaultAlign(currentText.style.textAlign);
  }, [currentText]);
  
  const handleSizeChange = (e) => {
    e.preventDefault();
    currentText.style.fontSize = e.target.value + 'px'
    setDefaultSize(e.target.value)
  }

  const handleColorChange = (e) => {
    currentText.style.color = e.target.value
    setDefaultColor(e.target.value)
  }

  const handleWeightChange = (e) => {
    currentText.style.fontWeight = e.target.value
    setDefaultWeight(e.target.value)
  }

  const handleAlignChange = (e) => {
    currentText.style.textAlign = e.target.value
    setDefaultAlign(e.target.value)
  }
  return (
    <div className={edit.title} style={formTextStyle}>
      <p className={edit.cmdButton} onClick={() => showForm(false)}>Cancel</p>
    <div className={edit.arrowDown}></div>
      <span>
        <Dropdown items={fontSizes} defaultValue={defaultSize} styleChange={handleSizeChange}/>
      </span>
      <span>
        <Dropdown items={fontWeights} defaultValue={defaultWeight} styleChange={handleWeightChange}/>
      </span>
      <form>
        <input type="color" value={defaultColor} name="style.color" onChange={handleColorChange}/>
      </form>
        <Dropdown items={textAligns} defaultValue={defaultAlign} styleChange={handleAlignChange}/>
        <p className={edit.cmdButton} onClick={save}>Apply</p>
    </div>
  );
};

export default TextEdit;