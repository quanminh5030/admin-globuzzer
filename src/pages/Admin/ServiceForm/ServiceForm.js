import React, { useEffect , useState} from 'react';
import styles from './ServiceForm.module.css';

const ServiceForm = ({setDisplay, currentService, updateService}) => {
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
    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>Articles</p>
            <form className={styles.container} >
                    <div className={styles.fields} >
                    <label>
                        Image
                        <input type="text" name="logo" value={data.logo} onChange={inputHandler} />
                    </label>
                    <label>
                        URL
                        <input type="text" name="link" value={data.link} onChange={inputHandler}/>
                    </label>
                    <label>
                        Text
                        <input type="text" name="des" value={data.des} onChange={inputHandler}/>
                    </label>
                    </div> 
                    <button className={styles.deleteBtn}>Delete the service!</button>
                </form>
                <div className={styles.buttons}>
                        <button type="submit" onClick={submitService}>Apply</button>
                        <button onClick={()=>setDisplay(false)}>Cancel</button>
                </div>
        </div>
    );
}

export default ServiceForm;
