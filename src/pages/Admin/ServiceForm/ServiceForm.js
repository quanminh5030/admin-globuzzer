import React, { useEffect , useState} from 'react';
import styles from './ServiceForm.module.css';

const ServiceForm = ({setDisplay, currentService, updateService, deleteService}) => {
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
        updateService({currentService}, data);
    }; 

    const showWarning = () => {
        deleteService(data);
    }
    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>Service Card</p>
            <form className={styles.container} >
                    <div className={styles.fields} >
                    <label><span>
                        Image<span className={styles.smallText}>(Image has to be below 200 KB and PNG/JPG format.)</span></span>
                    </label>
                        <input type="submit" name="logo" value="Upload image" onChange={inputHandler} />
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
