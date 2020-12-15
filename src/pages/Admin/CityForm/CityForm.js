import React, { useEffect , useState} from 'react';
import styles from './CityForm.module.css';

const CityForm = ({setIsVisible, currentItem, updateItem}) => {
    const [item, setItem] = useState(currentItem);

    useEffect(()=>{
        setItem(currentItem);
        console.log("useEffect passes current item", currentItem);
    },[currentItem]);

    const onChange = (e) => {
        const {name, value} = e.target;
        setItem({...item, [name]:value})
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log("submit passed the id and item", item);
        updateItem({currentItem}, item);
    }; 
    return (
        <div className={styles.wrapper}>
            <form className={styles.container} >
                <p className={styles.header}>City Section</p>
                    <div className={styles.fields} >
                    <label>
                        Cover Image
                        <input type="text" name="img" value={item.img} onChange={onChange} />
                    </label>
                    <label>
                        City section
                        <input type="text" name="name" value={item.name} onChange={onChange}/>
                    </label>
                    <label>
                        Members
                        <input type="text" name="members" value={item.members} onChange={onChange}/>
                    </label>
                    </div>
                    <button className={styles.editBtn}>Go to edit this page</button>  
                </form>
                <div className={styles.buttons}>
                        <button type="submit" onClick={submitForm}>Apply</button>
                        <button onClick={()=>setIsVisible(false)}>Cancel</button>
                </div>
        </div>
    );
}

export default CityForm;
