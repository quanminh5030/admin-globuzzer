import React, {useState} from 'react';
import styles from './CityForm.module.css';

const CityForm = ({setIsVisible}) => {
    const [image, setImage] = useState();
    const [city, setCity] = useState();
    const [join, setJoin] = useState();
    const [members, setMembers] = useState();
    return (
        <div className={styles.wrapper}>                
                <form className={styles.cityForm}>
                <p className={styles.title}>City Section</p>
                    <div className={styles.formContainer}>
                    <label className={styles.fields}>
                        Cover Image
                        <input type="text" name="image" value={image}/>
                    </label>
                    <label className={styles.fields}>
                        City section
                        <input type="text" name="city" value={city} placeholder="Rome"/>
                    </label>
                    <label className={styles.fields}>
                        Link
                        <input type="text" name="join" value={join} placeholder="http://baidu.com/"/>
                    </label>
                    <label className={styles.fields}>
                        Members
                        <input type="number" name="members" value={members} placeholder="123"/>
                    </label>
                    </div>
                    <button className={styles.goEdit}>Go to edit this page</button>
                    <div className={styles.mainBtn}>
                        <button type="submit">Apply</button>
                        <button onClick={()=>setIsVisible(false)}>Cancel</button>
                    </div>
                </form>
        </div>
    );
}

export default CityForm;
