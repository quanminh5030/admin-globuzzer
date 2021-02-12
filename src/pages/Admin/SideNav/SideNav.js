import React from 'react';
import styles from './SideNav.module.css';
import {Link} from 'react-router-dom';

const SideNav = () => {
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
				<li className={styles.topic}>Topic page</li>
				<li className={styles.other}>Other page</li>
				<li className={styles.bottom}>Bottom area</li>
				<li className={styles.request}>Request section</li>
			</ul>
		</div>
	);
}

export default SideNav;
