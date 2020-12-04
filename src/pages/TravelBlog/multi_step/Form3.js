import React, { useState } from "react";
import free from "./image/free.png";
import blue from './image/blue.svg';
import pink from './image/pink.svg';
import premium from './image/premium.svg';
import nextBtn from './image/next.svg';
import Card from "./Card";
import user from "./userForm.module.css";

function Form3({ nextStep, prevStep }) {
  const [plan, setPlan] = useState(null);
  const [lists] = useState({
    free: [
      { title: "Be a partner with Globuzzer" },
      { title: "Own 50% of your revenue" },
      { title: "Access courses and guides" },
      { title: "Established community" },
      { title: "Control of subscriptions and revenue streams" },
      { title: "SEO optimization" },
    ],
    premium: [
      { title: "Keep all your revenue" },
      { title: "100% ownership of your travel blog" },
      { title: "Access courses and guides" },
      { title: "Established community" },
      { title: "Control of subscriptions" },
      { title: "SEO optimization" },
    ],
  });
  const validate = () => {
    if (!plan) return alert("Please choose plan");

    nextStep();
  };

  const btnStyle = (planType) => {
    if (planType === plan && planType === "free") {
      return {
        background: "#5ebfbf",
        color: "#fff",
      };
    }

    if (planType === plan && planType === "premium") {
      return {
        background: "#F24B6A",
        color: "#fff",
      };
    }
  };
  return (
    <div className={user.form3Container}>
      <div className={user.flex}>
        <Card
          src={free}
          type="free"
          lists={lists.free}
          price="0.00"
          className={user.freeLi}
          underline={user.freeUnderline}
          chooseImg={blue}
          onClick={() => setPlan("free")}
          btnStyle={btnStyle("free")}
          next={nextBtn}
        />

        <Card
          src={premium}
          type="premium"
          lists={lists.premium}
          price={19.99}
          className={user.premiumLi}
          underline={user.premiumUnderline}
          chooseImg={pink}
          onClick={() => setPlan("premium")}
          btnStyle={btnStyle("premium")}
          next={nextBtn}
        />
      </div>

      <div className={`${user.send}`}>
        <button className={`${user.btn}`} onClick={validate}>
          Send
        </button>

        <span onClick={() => prevStep()}>back</span>
      </div>
    </div>
  );
}

export default Form3;
