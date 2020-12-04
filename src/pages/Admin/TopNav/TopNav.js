import React from 'react';
import logo from "../../../assets/TravelBlog/globuzz_logo.svg";
import logoSmall from "../../../assets/TravelBlog/globe_logo.svg";
import { auth } from "../../../utils/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {Link} from 'react-router-dom';
import styles from './TopNav.module.css';
import { selectCurrentUser } from "../../../redux/user/user.selectors";
const TopNav = ({ currentUser }) => {
    return (
        <div className={styles.header}>
        <img src={logo} alt="logo" />
        <img src={logoSmall} alt="logo-icon" />
        {currentUser ? (
          <Link className={styles.logout} onClick={() => auth.signOut()}>
            SIGN OUT
          </Link>
        ) : (
          <Link to="/">SIGN IN</Link>
        )}
      </div>
    );
}

const mapStateToProp = createStructuredSelector({
    currentUser: selectCurrentUser,
  });
  
export default connect(mapStateToProp)(TopNav);
