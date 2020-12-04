import React, { useState, useEffect } from "react";
import styles from "./Package.module.css";
import { SignUpData } from "../../../assets/Section/SignUp/SignUpData";
import { IconContext } from "react-icons";
import { IoIosArrowDropleft } from "react-icons/io";

const Package = ({ history }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;

    mounted && setCity();

    return () => (mounted = false);
  }, []);

  const setCity = () => {
    const country = SignUpData.filter((c) => c.name === "Helsinki");

    setData(country[0].details);
  };

  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={() => history.goBack()}>
        <IconContext.Provider value={{ className: "backIcon" }}>
          <IoIosArrowDropleft />
        </IconContext.Provider>
        <span>Back</span>
      </div>

      <div className={styles.content}>
        <header>
          <p>
            <span>$20 per month </span>
            <span className={styles.cityName}>for Helsinki</span>
          </p>
        </header>

        <div className={styles.city}>
          {data.map((city) => (
            <div className={styles.cityCard} key={city.id}>
              <img src={city.img} alt="city" />

              <div className={styles.cityCenter}>
                <p>Free relocating</p>
                <p>Packages</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cityBtn}>
          <a href="https://globuzzer.mn.co/sign_up?space_id=195832&from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F195832%2Ffeed%3Fautojoin%3D1%26autojoin_space_id%3D195832">
            <button>Let's go</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Package;
