import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MemberNearYou } from "../MemberNearYou/MemberNearYou";
import MemberNearYouData from "../../Data/MemberNearYouData";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import "./style.css";

import Gunjan from "../../assets/Gunjan.png";
import Chloe from "../../assets/Chloe.png";
import Jonathan from "../../assets/Jonathan.png";
import Chloé from "../../assets/Asya.png";

export const JoinCommunity = () => {
  const { width } = GetWindowDimension();
  const Join = () => (
    <section className="join">
      <div className="join_video_container">
        <video
          width="100%"
          autoPlay
          playsInline
          loop
          muted
          poster="https://www.mightynetworks.com/wp-content/themes/_mn2018/img/video-home-page-poster-new.png"
          className="video"
        >
          <source
            src="https://staging1.globuzzer.com/globuzzer_Liu/pages/vid.mp4"
            type="video/mp4"
          />
          <track kind="captions" />
        </video>
      </div>

      <div className="join_info">
        <p id="join_title">Connect with expats and locals around the world</p>
        <p id="join_header">More than 180K expats and 32K members globally</p>
        <div className="join_member_list">
          {MemberNearYouData.map((memberData, index) => (
            <MemberNearYou memberData={memberData} key={index} />
          ))}
        </div>
        <button type="button" className="join_button">
          <Link to="/signup" className="join_button_anchor">
            Join us
          </Link>
        </button>
      </div>
    </section>
  );
  const JoinMobile = () => (
    <div>
      <SectionHeader header="Top members to meet" />
      <div className="member_meet_grid">
        <div />
        <div className="member_ava_container">
          <img src={Gunjan} alt="ava" className="member_ava" />
          <p className="member_ava_name">Gunjan</p>
          <p className="member_ava_city">Lives in Stockholm</p>
        </div>
        <div />
        <div className="member_ava_container">
          <img src={Chloe} alt="ava" className="member_ava" />
          <p className="member_ava_name">Chloe</p>
          <p className="member_ava_city">Lives in Amsterdam</p>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <FiPlus className="member_join_icon" />
            </div>
            <button type="button" className="flip-card-back">
              <Link to="/signup" className="join_button_anchor">
                Join us
              </Link>
            </button>
          </div>
        </div>
        <div className="member_ava_container">
          <img src={Chloé} alt="ava" className="member_ava" />
          <p className="member_ava_name">Chloé</p>
          <p className="member_ava_city">Lives in Paris</p>
        </div>
        <div />
        <div className="member_ava_container">
          <img src={Jonathan} alt="ava" className="member_ava" />
          <p className="member_ava_name">Jonathan</p>
          <p className="member_ava_city">Lives in Stockholm</p>
        </div>
        <div />
      </div>
    </div>
  );
  return <>{width > 1100 ? <Join /> : <JoinMobile />}</>;
};
