import React, { useState , useEffect} from "react";
import user from "./userForm.module.css";

function Form1({ nextStep }) {
  const localTopic=window.localStorage.getItem('topic');
  const [topic, setTopic] = useState("");
  const [textarea, setTextarea] = useState("");
  const [savedTopic, setSavedTopic] = useState(localTopic);
  const options = [
    { label: "City Guides", value: "city guides" },
    { label: "Travel Experiences", value: "travel experiences" },
    {
      label: "I want to transfer my travel blog to Globuzzer",
      value: "I want to transfer my travel blog to Globuzzer",
    },
  ];

  useEffect(()=>{
    if (!savedTopic) {
     const newTopic =  window.localStorage.getItem('form');
     setSavedTopic(newTopic);
    }
    loadedChoice();
  },[])

  const handleChange = ({ target: input }) => {
    setTopic(input.value);
  };

  const textArea = ({ target: input }) => {
    setTextarea(input.value);
  };

  const validate = () => {
    if (topic === "other" && !textarea) return alert("Please fill textarea");
    if (!topic) return alert("Please choose a topic");
    window.localStorage.setItem('topic', topic);
    nextStep();
  };

  const loadedChoice = () => {
    const options = document.querySelectorAll('input');
    for (const option of options) {
      if (option.value === savedTopic) {
        option.checked = true;
        setTopic(option.value)
      }
    }
    // const selectedOption = [...options].filter((option) => option.value === savedTopic)
    // selectedOption[0].checked = true;
  }

  return (
    <div className={user.pageContainer}>
      <p className={user.reminder}>*yes you have to fill out these fields</p>
      <header className={user.pageHeader}>
        Tell us what you want to write about? *
      </header>

      <div className={user.pageBody}>
        {options.map((option, index) => (
          <div className={user.option} key={index}>
            <label className={user.choice}>
              <input 
              type="radio" className={user.radio}
              value={option.value}
              onChange={handleChange}
              name="topic"
            />
            {option.label}
            <span className={user.checkmark}/>
            </label>
          </div>
        ))}

        <div className={`${user.option} ${user.otherOption}`}>
         
          <label className={user.choice}>
          <input className={user.radio}
            type="radio"
            value="other"
            onChange={handleChange}
            name="topic"
          />
          <span className={user.checkmark}/>
          Other(Please explain in the field below)</label>
        </div>

        <div className={user.textarea}>
          <textarea onChange={textArea} />
        </div>

        <div className={user.continue}>
          <button className={`${user.btn} ${user.danger}`} onClick={validate}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form1;
