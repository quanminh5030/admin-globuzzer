import React, { useState } from 'react';
import styles from './SideNav.module.css';
import { Link } from 'react-router-dom';
import TopicMenu from './TopicMenu';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const SideNav = ({iconTopic}) => {

  const [anchorElCountries, setAnchorElCountries] = useState(null);
  const [iconDisplay, setIconDisplay] = useState(false)

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
        <Link
          to='/topic'
          onClick={() => setIconDisplay(true)}
        >
          <li onClick={showCountries} className={styles.topic}>
            {iconDisplay || iconTopic ?
              <ArrowRightIcon
                fontSize='large'
              />
              : <div />}
            <span style={iconDisplay || iconTopic ? { marginRight: 30 } : {}}>
              Topic page
            </span>
          </li>
          <TopicMenu
            setIconDisplay={setIconDisplay}
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
