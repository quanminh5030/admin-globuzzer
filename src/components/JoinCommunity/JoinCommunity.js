import React, { useContext, useEffect, useState } from "react";
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
import JoinCommunityForm from "../../pages/Admin/JoinCommunityForm/JoinCommunityForm";
import { EditContext } from "../../contexts/editContext";
import TextEdit from "../TextEdit/TextEdit";
import { firestore } from "../../utils/firebase.utils";
import { Fragment } from "react";

export const JoinCommunity = (props) => {
  const { editStyle, contentEditable } = props;
  const { width } = GetWindowDimension();
  const { editMode } = useContext(EditContext);
  const [showTextCommunityForm, setShowTextCommunityForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [videos, setVideos] = useState([]);

  const rawText = {
    content: '',
    style: {
      color: '',
      fontSize: '',
      fontWeight: '',
      textAlign: ''
    }
  };

  const [fetchedCommunityTexts, setFetchedCommunityTexts] = useState([]);
  const [currentCommunityText, setCurrentCommunityText] = useState(rawText);

  const formTextStyle = editMode && showTextCommunityForm ? {
    position: 'relative',
    top: '1%' ,
    left: '10%'
  }
            : 

  { display: 'none'};

  // fetch comunnity 'texts' content from db
  useEffect(() => {
    const getTexts = firestore
      .collection("community")
      .onSnapshot((snapshot) => {
        const newText = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFetchedCommunityTexts(newText);
      });
      return () => getTexts();
  }, []);

  // fetch 'videos' content from db
  useEffect(() => {
    const fetchVideos = firestore
    .collection('video')
    .onSnapshot((snapshot) => {
      const newVideo = snapshot.docs.map((doc) => ({
        ...doc.data()
      }));
      setVideos(newVideo);
    });
    return () => fetchVideos();
  }, [])

  const showForm = () => {
    return editMode ? setShowPhotoForm(true) : undefined;
  };

  const getCurrentCommunityText = (e) => {
    const newText = fetchedCommunityTexts.filter((text) => {
      return text.id === e.target.id;
    });
    setCurrentCommunityText(newText[0]);
  };

  // change handler for community text
  const handleChangeCommunityText = (e) => {
    setCurrentCommunityText({...currentCommunityText, content: e.target.innerText, id: e.target.id});
 };

  const handleSubmitText = async () => {
    await firestore.collection("community").doc(currentCommunityText.id).update(currentCommunityText);
    console.log(currentCommunityText.id, "saved to db")
  };

  const onSelectedText = (text, currentText) => {
    return (
      showTextCommunityForm && text.id === currentText.id &&
      <TextEdit 
        currentText={currentText} 
        formTextStyle={formTextStyle} 
        setShowForm={setShowTextCommunityForm} 
        save={handleSubmitText}
      />
    );
  };
  const Join = () => (
    <section className="join">
      <div className="join_video_container" onClick={showForm}>
      {videos.map(video => (
        <video
          key={video.img}
          width="100%"
          autoPlay
          playsInline
          loop
          muted
          poster={video.img}
          className="video"
          style={editStyle}
        >
          <track kind="captions" />
        </video>
        ))}
      </div>
      <div className="join_info">
        {fetchedCommunityTexts.map(t => (
          <Fragment key={t.id}>
            {onSelectedText(t, currentCommunityText)}
            <p
            className={t.cssid}
            id={t.id}
            name={t.id}
            contentEditable={contentEditable}
            style={{ ...editStyle, ...t.style }}
            suppressContentEditableWarning="true"
            onFocus={getCurrentCommunityText}
            onBlur={handleChangeCommunityText}
            onClick={() => setShowTextCommunityForm(true)}
          >
            {t.content}
          </p>
        </Fragment>
        ))}
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
      <JoinCommunityForm 
        showPhotoForm={showPhotoForm} 
        setShowPhotoForm={setShowPhotoForm} 
      />
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
