import React, {useState} from 'react';
import styles from './CityForm.module.css';

const CityForm = ({setIsVisible, cityData}) => {

    const {name, img, members, id} = cityData;

    return (
        <div className={styles.wrapper} key={id}>                
                <form className={styles.cityForm}>
                <p className={styles.title}>City Section</p>
                    <div className={styles.formContainer}>
                    <label className={styles.fields}>
                        Cover Image
                        <input type="text" name="img" value={img}/>
                    </label>
                    <label className={styles.fields}>
                        City section
                        <input type="text" name="name" value={name}/>
                    </label>
                    <label className={styles.fields}>
                        Members
                        <input type="number" name="members" value={members}/>
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
