import React from 'react';
import styles from './Relocate.module.css';
import Mobile from './Mobile/Mobile';
import Desktop from './Desktop/Desktop';
import Summary from './Summary/Summary';
import {GetWindowDimension} from '../../../utils/GetWindowDimension';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
const Relocate = () => {
    const { width } = GetWindowDimension();
    return (
        <div className={styles.wrapper}>
            <BlogHeader label="Customized Relocating Packages"/>
            <Summary/>
            {width >= 1100 ? <Desktop/> : <Mobile/>}
        </div>
    );
}

export default Relocate;
