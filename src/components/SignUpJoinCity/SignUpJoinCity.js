import React from "react";
import "./style.css";
import {AiOutlineCheckCircle} from "react-icons/ai";

export const SignUpJoinCity = (props) => {
    const {cityData, selected, setSelected, index, setNavlink} = props;
    const {name, img, members, join} = cityData;
    const styles = {
        faded: {
            color: selected === index && "rgba(255, 255, 255, 0.2)",
        },
    };
    return (
        <>
            <button
                className="signup_joincity_container"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundColor: selected === index && "rgba(0, 0, 0, 0.6)",
                }}
                onClick={() => {
                    setSelected(index);
                    setNavlink(join);
                }}
                type="button"
            >
                <p id="signup_joincity_name" style={styles.faded}>
                    {name}
                </p>
                <p id="joincity_members" style={styles.faded}>
                    {members} members
                </p>
                {selected === index && <AiOutlineCheckCircle className="signup_joincity_icon" />}
            </button>
        </>
    );
};
