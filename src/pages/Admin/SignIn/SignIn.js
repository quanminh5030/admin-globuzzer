import React, { Component } from "react";
import styles from "./SignIn.module.css";
import logo from "../../../assets/TravelBlog/globuzz_logo.svg";
import logoSmall from "../../../assets/TravelBlog/globe_logo.svg";
import { auth } from "../../../utils/firebase.utils";
import { Link } from "react-router-dom";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  inputHandler = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.right}>
          <div className={styles.logo}>
            <img src={logoSmall} alt="logo-icon" />
            <img src={logo} alt="logo" />
          </div>
          <p className={styles.text}>Sign in to Globuzzer Admin</p>
          <form className={styles.container}>
            <div className={styles.signIn}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.inputHandler}
                value={this.state.email}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.inputHandler}
                value={this.state.password}
                required
              />
            </div>
            <div className={styles.options}>
              <label>
                <input type="checkbox" />
                <span className={styles.checkmark} />
                Remember me
              </label>
              <a className={styles.link}href="www">Forgot Password?</a>
            </div>
          </form>
          <button
            type="submit"
            onClick={this.submitHandler}
            className={styles.login}
          >
            LOGIN
          </button>
          <Link to="/signup" className={styles.link}>
            Don't have an account? Create now
          </Link>
        </div>
      </div>
    );
  }
}

export default SignIn;
