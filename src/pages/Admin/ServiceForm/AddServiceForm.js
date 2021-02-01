import React, { useState } from 'react';
import styles from './ServiceForm.module.css';

const AddServiceForm = (props) => {
  const { onFileChange, setDisplay, fileUrl, createService } = props;
  const rawData = {
    des: "",
    link: "",
    logo: "",
    name: "",
  };
  const [data, setData] = useState(rawData);

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  };

  const submitService = (e) => {
    e.preventDefault();
    createService({ ...data, logo: fileUrl });
    setData(rawData);
  }; 

  const style = {
    margin: '20px -120px'
  };

  return (
    <div className={styles.wrapper} style={style}>
      <p className={styles.header}>Create a new service card</p>
      <form className={styles.container} onSubmit={submitService}>
        <div className={styles.fields} >
          <div className={styles.icon_text}>
            Image
            <span>
                (Image has to be below 200 KB and PNG/JPG format.)
            </span>
          </div>
          <div className={styles.upload_btn_wrapper}>
            <input 
                type="file" 
                name="logo" 
                onChange={onFileChange} 
            />
            <button 
                className={styles.btn}
            >
              Upload image
            </button>
          </div>
          <label>
            URL
          </label>
            <input type="text" name="link" value={data.link} onChange={inputHandler}/>
          <label>
            Title
          </label>
            <input type="text" name="name" value={data.name} onChange={inputHandler}/>
          <label>
            Text
          </label>
            <textarea id="des" name="des" value={data.des} onChange={inputHandler}/>
        </div> 
          
        <div className={styles.buttons}>
          <button type="submit">Apply</button>
          <button onClick={()=>setDisplay(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceForm;