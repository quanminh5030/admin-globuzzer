import React, { useState, useContext, useEffect } from "react";
import { getStarted } from "./showGetStarted";
import CircleWrapper from "./CircleWrapper";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import close from "./image/btn_close.png";
import user from "./userForm.module.css";

function UserForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [smallScreen, setSmallScreen] = useState(false);
  const display = useContext(getStarted);

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
    checkScreen();

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const checkScreen = () => {
    if (window.innerWidth <= 700) return setSmallScreen(true);
    setSmallScreen(false);
  };

  const nextStep = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevStep = () => {
    setCurrentPage(currentPage - 1);
  };

  const circleStyle = (n) => {
    if (currentPage >= n)
      return {
        background: "#fff",
        color: " #f24b6a",
      };
  };

  const stepTextStyle = (n) => {
    if (currentPage >= n)
      return {
        fontWeight: "700",
      };
  };

  const resetPage = () => {
    setCurrentPage(1);
    window.localStorage.clear();
  };

  const closeGetStarted = () => {
    display.setGetStarted(false);

    resetPage();
  };

  const render = () => {
    switch (currentPage) {
      case 1:
        return <Form1 nextStep={nextStep} />;

      case 2:
        return <Form2 nextStep={nextStep} prevStep={prevStep} />;

      case 3:
        return <Form3 nextStep={nextStep} prevStep={prevStep} />;

      default:
        return <Form4 resetPage={resetPage} />;
    }
  };

  return (
    <div
      className={user.container}
      style={{ display: display.showGetStarted ? "flex" : "none" }}
    >
      <div className={user.formContainer}>
        <div className={user.top}>
          <div className={user.closeBtn} onClick={closeGetStarted}>
            <img src={close} alt="closeBtn" />
          </div>

          {currentPage === 4 ? (
            <p className={user.gratitude}>
              {" "}
              {smallScreen ? "Thank you" : "Thank you for choosing Globuzzer!"}
            </p>
          ) : (
            <header className={user.mainHeader}>
              {smallScreen ? "Application form" : "Start your travel blog"}
            </header>
          )}

          {currentPage !== 4 && (
            <div className={user.circleContainer}>
              <CircleWrapper
                container={user.circleWrapper}
                number={1}
                circle={user.circle}
                label="About your desired topic"
                chosen={stepTextStyle(1)}
                style={circleStyle(1)}
                lineClass={user.circleLine}
              />

              <CircleWrapper
                container={user.circleWrapper}
                number={2}
                circle={user.circle}
                label="About you"
                chosen={stepTextStyle(2)}
                style={circleStyle(2)}
                lineClass={user.circleLine}
              />

              <CircleWrapper
                container={user.circleWrapper}
                number={3}
                circle={user.circle}
                label="About your blog plan"
                chosen={stepTextStyle(3)}
                style={circleStyle(3)}
              />
            </div>
          )}
        </div>

        <div className={user.bottom}>{render()}</div>
      </div>
    </div>
  );
}

export default UserForm;
