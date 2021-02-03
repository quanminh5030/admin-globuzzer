import React, { Component } from "react";
import styles from "./SignUp.module.css";
import logo from "../../../assets/TravelBlog/globuzz_logo.svg";
import logoSmall from "../../../assets/TravelBlog/globe_logo.svg";
import { auth, createUserProfileDocument } from "../../../utils/firebase.utils";
class SignIn extends Component {
  constructor() {
    super();
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
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { email });

      //this clears the form
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.right}>
          <div className={styles.logo}>
            <img src={logoSmall} alt="logo-icon" />
            <img src={logo} alt="logo" />
          </div>
          <p className={styles.text}>Sign up to be Globuzzer Admin</p>
          <form className={styles.container}>
            <div className={styles.signIn}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.inputHandler}
                value={email}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.inputHandler}
                value={password}
                required
              />
            </div>
            <div className={styles.options}>
              <label>
                <input type="checkbox" />
                <span className={styles.checkmark} />
                Remember me
              </label>
              <a className={styles.link} href="www">Forgot Password?</a>
            </div>
          </form>
          <button
            type="submit"
            onClick={this.submitHandler}
            className={styles.login}
          >
            SIGN UP
          </button>
        </div>
      </div>
    );
  }
}

export default SignIn;
