import React, { useContext, useState, useEffect } from 'react';
import { EditContext } from '../../../contexts/editContext';
import edit from './BannerForm.module.css';
import { sizes, weights, aligns } from './Data';
import Dropdown from './Dropdown';

const BannerForm = () => {
  // values for drop-down lists
  const[fontSizes] = useState(sizes);
  const[fontWeights] = useState(weights);
  const[textAligns] = useState(aligns);

  const {
    handleChange, handleSubmit, showForm, setShowForm,
    currentPlace, showTextForm, setShowTextForm, headerID, handleSubmitText,
    currentText
        } = useContext(EditContext);
  // manage display and position of popping-up forms
  const formStyle = !showForm ? { display: "none" } : {};
  const formTextStyle = !showTextForm ? { display: "none" }
            : {
                position:'',
                top: headerID === 1 ? '300px' : '400px',
                left: '750px'
              };
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
  
  const handleColorChange = (e) => {
    currentText.style.color = e.target.value
    setDefaultColor(e.target.value)
  }

  const handleSizeChange = (e) => {
    e.preventDefault();
    currentText.style.fontSize = e.target.value + 'px'
    setDefaultSize(e.target.value)
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
    <div>
      {/*Start form for text headers edit on the banner*/}
    <div className={edit.title} style={formTextStyle}
    onDoubleClick={() => setShowTextForm(false)}
    >
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
    {/* <img src="/images/sizer.png" alt="" /> */}
    
    <Dropdown items={textAligns} defaultValue={defaultAlign} styleChange={handleAlignChange}/>
    
    </div>
  {/*END form for text headers edit on the banner*/}
    {/*Start forms for city place edit on the banner*/}
    <div className={edit.place} style={formStyle}>
      <p className={edit.head}>Place</p>
      <hr color="#E4E4E4" />
      <div className={edit.formContainer}>
        <form className={edit.form} >
          <label htmlFor="color">Color</label>
          <input type="text"
                 value={currentPlace.color}
                 name="color"
                 onChange={handleChange}
                 style={{marginLeft: "20px"}}
          />
          <label htmlFor="text">Text</label>
          <input type="text"
                 value={currentPlace.text}
                 name="text"
                 onChange={handleChange}
                 style={{marginLeft: "20px"}}
          />
          <label htmlFor="link">Link</label>
          <p>{currentPlace.text}</p>
          <p></p>
          <input type="text"
                 value={currentPlace.link}
                 name="link"
                 onChange={handleChange}
                 style={{position:"relative", left:"-45px", width:"120%"}}
          />
        </form>
      </div>
      <div className={edit.command}>
      <p id="apply" onClick={handleSubmit}>Apply</p>
      <p id="cancel" onClick={() => setShowForm(false)}>Cancel</p>
      </div>
    </div>
  {/*END forms for city place edit on the banner*/}
    </div>
  )
}

export default BannerForm;
