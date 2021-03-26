import React, { useContext } from 'react';
import { EditContext } from '../../../contexts/editContext';
import styles from './Vimeo.module.css';
import VimeoForm from './VimeoForm';

const Vimeo = ({ cityId }) => {
    const { editStyle, editMode } = useContext(EditContext)
    return (
        <div className={styles.wrapper} style={editStyle}>
            <div className={styles.container}>
                <p className={styles.title}>Vimeo</p>
                <p className={styles.caption}>Customizable Player</p>
                <p className={styles.text}>A Vimeo Feature</p>
            </div>
            <button className={styles.btn}>Learn more</button>
            <VimeoForm />
        </div>
    );
}

export default Vimeo;
