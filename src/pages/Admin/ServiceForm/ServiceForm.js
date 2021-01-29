import React, { useEffect , useState} from 'react';
import styles from './ServiceForm.module.css';

const ServiceForm = ({ 
    setDisplay, 
    currentService, 
    updateService, 
    deleteService,
    onFileChange,
    fileUrl }) => {
    const [data, setData] = useState(currentService);

    useEffect(()=>{
        setData(currentService);
        console.log("useEffect passes current item", currentService);
    },[currentService]);

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]:value})
    };

    const submitService = (e) => {
        e.preventDefault();
        console.log("submit passed the id and item", data);
        updateService({currentService}, {...data, logo: fileUrl || data.logo});
    }; 

    const showWarning = () => {
        deleteService(data);
    }
    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>Service Card</p>
            <form className={styles.container} >
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
                        <input 
                            type="text" 
                            name="link" 
                            value={data.link} 
                            onChange={inputHandler}
                        />
                    <label>
                        Title
                    </label>
                        <input 
                            type="text" 
                            name="name" 
                            value={data.name} 
                            onChange={inputHandler}
                        />
                    <label>
                        Text
                    </label>
                        <textarea 
                            id="des" 
                            name="des" 
                            value={data.des} 
                            onChange={inputHandler}
                        />
                </div> 
                    <button className={styles.deleteBtn} onClick={showWarning}>Delete the service!</button>
            </form>
            <div className={styles.buttons}>
                <button type="submit" onClick={submitService}>Apply</button>
                <button onClick={()=>setDisplay(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default ServiceForm;
