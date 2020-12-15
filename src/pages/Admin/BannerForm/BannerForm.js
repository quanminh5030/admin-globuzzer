import React, { useContext, useState, useEffect } from 'react';
import { EditContext } from '../../../contexts/editContext';
import edit from './BannerForm.module.css';
import { sizes, weights } from './Data';
import Dropdown from './Dropdown';

const BannerForm = () => {
  // values for drop-down lists
  const[fontSizes] = useState(sizes);
  const[fontWeights] = useState(weights);

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
  // set the default values for drop-down lists
  const [defaultSize, setDefaultSize] = useState('');
  const [defaultWeight, setDefaultWeight] = useState('');

  useEffect(() => {
    setDefaultSize(currentText.style.fontSize.substring(0, 2, - 1));
    setDefaultWeight(currentText.style.fontWeight);
  }, [currentText]);

  return (
    <div>
      {/*Start form for text headers edit on the banner*/}
    <div className={edit.title} style={formTextStyle}
    onDoubleClick={() => setShowTextForm(false)}
    >
    <div className={edit.arrowDown}></div>
    <Dropdown items={fontSizes} defaultValue={defaultSize} />
    <Dropdown items={fontWeights} defaultValue={defaultWeight} />
    <form>
      <input type="color" defaultValue="#C4C4C4" name="style.color" />
    </form>
    <img src="/images/sizer.png" alt="" onClick={handleSubmitText}/>
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