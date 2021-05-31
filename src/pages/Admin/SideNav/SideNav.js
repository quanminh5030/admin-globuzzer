import React, { useState } from 'react';
import styles from './SideNav.module.css';
import { Link } from 'react-router-dom';
import TopicMenu from './TopicMenu';

const SideNav = () => {

  const [anchorElCountries, setAnchorElCountries] = useState(null);

	const showCountries = event => {
		setAnchorElCountries(event.currentTarget)
	}

  return (
    <div className={styles.wrapper}>
      <ul className={styles.container}>
        <Link to="/landing">
          <li className={styles.landing}>Landing page</li>
        </Link>
        <Link to="/section">
          <li className={styles.section}>Section page</li>
        </Link>
        <li className={styles.service}>Service page</li>
        <Link to='/topic'>
          <li onClick={showCountries} className={styles.topic}>Topic page
          </li>
          <TopicMenu 
            anchorElCountries={anchorElCountries}
            setAnchorElCountries={setAnchorElCountries}
          />
        </Link>
        <li className={styles.other}>Other page</li>
        <li className={styles.bottom}>Bottom area</li>
        <li className={styles.request}>Request section</li>
      </ul>
    </div>
  );
}

export default SideNav;
